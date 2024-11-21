import { Test, TestingModule } from '@nestjs/testing';
import { FxQlServices } from '../fxql.service';
import { FxQlDto } from '../dto';
import { Response } from 'express';
import { FxQlController } from '.';

describe('FxQlController', () => {
    let controller: FxQlController;
    let service: FxQlServices;

    const mockFxQlService = {
        fxqlStatements: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FxQlController],
            providers: [
                {
                    provide: FxQlServices,
                    useValue: mockFxQlService,
                },
            ],
        }).compile();

        controller = module.get<FxQlController>(FxQlController);
        service = module.get<FxQlServices>(FxQlServices);
    });
    console.log(service)
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('fxqlStatements', () => {
        it('should call service.fxqlStatements and return the response', async () => {
            const mockRequestBody: FxQlDto = {
                FXQL: 'USD-EUR { BUY 1.12 SELL 1.10 CAP 100 }',
            };

            // Mock the `res` object with chaining support
            const mockJson = jest.fn();
            const mockStatus = jest.fn(() => ({ json: mockJson }));
            const mockResponse = {
                status: mockStatus,
            } as unknown as Response;

            const mockServiceResponse = {
                status: 200,
                message: 'Rates Parsed Successfully.',
                data: [
                    {
                        EntryId: 1,
                        SourceCurrency: 'USD',
                        DestinationCurrency: 'EUR',
                        SellPrice: 1.10,
                        BuyPrice: 1.12,
                        CapAmount: 100,
                    },
                ],
            };

            // Mock service behavior
            mockFxQlService.fxqlStatements.mockResolvedValue(mockServiceResponse);

            // Call the controller method
            await controller.fxqlStatements(mockRequestBody, mockResponse);

            // Verify service method is called with correct arguments
            expect(mockFxQlService.fxqlStatements).toHaveBeenCalledWith({
                FXQL: 'USD-EUR { BUY 1.12 SELL 1.10 CAP 100 }',
            });

            // Verify response methods are called correctly
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockServiceResponse);
        });
    });

});
