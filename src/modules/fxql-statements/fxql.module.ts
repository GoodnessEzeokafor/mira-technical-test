import { Module } from '@nestjs/common';
import { FxQlController } from './controller';
import { FxQlServices } from './fxql.service';
import { UtilsServicesModule } from 'src/shared/utils';

@Module({
    imports: [UtilsServicesModule],
    controllers: [FxQlController],
    providers: [FxQlServices],
    exports: [FxQlServices]
})
export class FxqlModule { }
