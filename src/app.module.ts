import { Module } from '@nestjs/common';
import modules from './modules';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(), ...modules],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
