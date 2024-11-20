import { Global, Module } from '@nestjs/common';
import { SequelizeServicesModule } from './sequelize/sequelize-service.module';

@Global()
@Module({
    imports: [SequelizeServicesModule],
    exports: [SequelizeServicesModule],
})
export class DatabaseServicesModule { }
