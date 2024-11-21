import { Test, TestingModule } from '@nestjs/testing';
import { IDatabaseServices } from '../database/sequelize';
import { ResponseUtilsService } from 'src/shared/utils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FxqlEntity } from './entity';
import { FxQlServices } from './fxql.service';
import { ISuccessResponse } from 'src/shared';

describe('FxQlServices', () => {
    let service: FxQlServices;
    let dbMock: jest.Mocked<IDatabaseServices>;
    let emitterMock: jest.Mocked<EventEmitter2>;
    let responseMock: jest.Mocked<ResponseUtilsService>;

    beforeEach(async () => {
        dbMock = {
            fxql: {
                bulkCreate: jest.fn(),
            },
        } as unknown as jest.Mocked<IDatabaseServices>;

        emitterMock = {
            emit: jest.fn(),
        } as unknown as jest.Mocked<EventEmitter2>;

        responseMock = {
            success200Response: jest.fn().mockImplementation((data) => data),
            error409Response: jest.fn().mockImplementation((message) => {
                throw new Error(message);
            }),
        } as unknown as jest.Mocked<ResponseUtilsService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FxQlServices,
                { provide: IDatabaseServices, useValue: dbMock },
                { provide: EventEmitter2, useValue: emitterMock },
                { provide: ResponseUtilsService, useValue: responseMock },
            ],
        }).compile();

        service = module.get<FxQlServices>(FxQlServices);
    });

    describe('fxqlStatements', () => {
        it('should parse FXQL statements correctly and save them to the database', async () => {
            const payload = {
                FXQL: `
          USD-EUR {
            BUY 1.2
            SELL 1.1
            CAP 100
          }
          GBP-USD {
            BUY 1.3
            SELL 1.2
            CAP 200
          }
        `,
            };

            const result = await service.fxqlStatements(payload);

            expect(result.message).toBe('Rates Parsed Successfully.');
            expect((result as ISuccessResponse).data.length).toBe(2);
            expect((result as ISuccessResponse).data).toEqual([
                {
                    EntryId: 1,
                    SourceCurrency: 'USD',
                    DestinationCurrency: 'EUR',
                    SellPrice: 1.1,
                    BuyPrice: 1.2,
                    CapAmount: 100,
                },
                {
                    EntryId: 2,
                    SourceCurrency: 'GBP',
                    DestinationCurrency: 'USD',
                    SellPrice: 1.2,
                    BuyPrice: 1.3,
                    CapAmount: 200,
                },
            ]);

            expect(emitterMock.emit).toHaveBeenCalledWith('process.save.to.db', [
                {
                    sourceCurrency: 'USD',
                    destinationCurrency: 'EUR',
                    buy: 1.2,
                    sell: 1.1,
                    cap: 100,
                },
                {
                    sourceCurrency: 'GBP',
                    destinationCurrency: 'USD',
                    buy: 1.3,
                    sell: 1.2,
                    cap: 200,
                },
            ]);
        });

        it('should throw an error if more than 1000 currency pairs are provided', async () => {
            const FXQL = Array.from({ length: 1001 }, (_, i) =>
                `USD-${i + 1} { BUY 1.2 SELL 1.1 CAP 100 }`
            ).join('\n');

            const payload = { FXQL };

            await expect(service.fxqlStatements(payload)).rejects.toThrow(
                'The maximum allowed currency pairs per request is 1000'
            );
        });

        it('should throw an error for invalid FXQL block', async () => {
            const payload = {
                FXQL: `
          usd-EUR {
            BUY 1.2
            SELL 1.1
            CAP 100
          }
        `,
            };

            await expect(service.fxqlStatements(payload)).rejects.toThrow(
                "Invalid: 'usd' should be in uppercase"
            );
        });
    });

    describe('validateFXQLBlock', () => {
        it('should validate correct FXQL block', () => {
            const payload = {
                sourceCurrency: 'USD',
                destinationCurrency: 'EUR',
                buy: 1.2,
                sell: 1.1,
                cap: 100,
                FXQL: 'USD-EUR { BUY 1.2 SELL 1.1 CAP 100 }',
            };

            expect(() => service.validateFXQLBlock(payload)).not.toThrow();
        });

        it('should throw error for invalid currency casing', () => {
            const payload = {
                sourceCurrency: 'usd',
                destinationCurrency: 'EUR',
                buy: 1.2,
                sell: 1.1,
                cap: 100,
                FXQL: 'usd-EUR { BUY 1.2 SELL 1.1 CAP 100 }',
            };

            expect(() => service.validateFXQLBlock(payload)).toThrow(
                "Invalid: 'usd' should be in uppercase"
            );
        });

        it('should throw error for missing block spacing', () => {
            const payload = {
                sourceCurrency: 'USD',
                destinationCurrency: 'EUR',
                buy: 1.2,
                sell: 1.1,
                cap: 100,
                FXQL: 'USD-EUR{ BUY 1.2 SELL 1.1 CAP 100 }',
            };

            expect(() => service.validateFXQLBlock(payload)).toThrow(
                "Invalid: Missing single space after currency pair 'USD-EUR'"
            );
        });
    });

    describe('saveFxqlToDb', () => {
        it('should save parsed FXQL data to the database', async () => {
            const payload = [
                {
                    sourceCurrency: 'USD',
                    destinationCurrency: 'EUR',
                    buy: 1.2,
                    sell: 1.1,
                    cap: 100,
                },
            ] as FxqlEntity[];

            await service.saveFxqlToDb(payload);

            expect(dbMock.fxql.bulkCreate).toHaveBeenCalledWith(payload);
        });
    });
});
