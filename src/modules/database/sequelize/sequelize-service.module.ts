import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import models from './models';
import { DB_URL } from 'src/shared';
import { SequelizeDatabaseServices } from './sequelize.service';
import { SequelizeDatabaseHelperService } from './sequelize-db-helper.service';
import { IDatabaseServices, IDatabaseHelperServices } from './abstracts';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: DB_URL,
      synchronize: false,
      models: [...models],
      define: {
        timestamps: true,
      },
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // if using a self-signed certificate
        }
      },
      pool: {
        max: 20,
        min: 0,
        idle: 10000, // max time in ms that a connection can be idle before being released
        acquire: 60000, // max time in ms that Pool will try to get connection before throwing error
        evict: 1000, // max time in ms after which sequelize will remove idle connections
      }, // todo: add to config
    }),
  ],
  providers: [
    {
      provide: IDatabaseServices,
      useClass: SequelizeDatabaseServices,
    },
    {
      provide: IDatabaseHelperServices,
      useClass: SequelizeDatabaseHelperService,
    },
  ],
  exports: [IDatabaseServices, IDatabaseHelperServices],
})
export class SequelizeServicesModule { }
