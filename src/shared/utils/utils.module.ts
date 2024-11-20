import { Module } from '@nestjs/common';
import { ResponseUtilsService } from './response';
import { StringUtilsService } from './string';
import { DatabaseUtilsService } from './db';

@Module({
  providers: [
    ResponseUtilsService,
    StringUtilsService,
    DatabaseUtilsService,
  ],
  exports: [
    ResponseUtilsService,
    StringUtilsService,
    DatabaseUtilsService,

  ],
})
export class UtilsServicesModule { }
