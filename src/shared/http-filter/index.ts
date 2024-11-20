import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MESSAGES } from 'src/shared';
import * as _ from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception?.message;

        console.log(">>>>> exception ")
        console.log(exception)
        console.log(">>>>> exception ")


        console.log(">>>>> error message ")
        console.log(message)
        console.log(">>>>> error message ")

        response.status(status).json({
            technicalMessage: message,
            message: this.#getMessage(message),
            status,
            code: `FXQL-${status}`,

        });
    }

    #getMessage(message: string) {
        if (ERROR_MESSAGES.includes(message)) return message
        if (String(message).includes('Validation failed:')) return message
        if (String(message).includes('Invalid:')) return message
        return 'An error has occurred, please contact support.'
    }
}
