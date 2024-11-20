import { Module } from '@nestjs/common';
import modules from './modules';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared';

@Module({
  imports: [...modules],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
