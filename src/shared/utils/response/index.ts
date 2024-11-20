import { Injectable, HttpStatus } from '@nestjs/common';
import { ResponseStateEnum } from 'src/shared/enum';
import { ISuccessResponse, IErrorResponse } from 'src/shared/types';

@Injectable()
export class ResponseUtilsService {
  public success201Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      code: `FXQL-${HttpStatus.CREATED}`
    };
  }
  public success200Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      code: `FXQL-${HttpStatus.OK}`,
      status: HttpStatus.OK
    };
  }

  public success202Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      code: `FXQL-${HttpStatus.ACCEPTED}`,
      status: HttpStatus.ACCEPTED

    };
  }

  public success204Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      code: `FXQL-${HttpStatus.NO_CONTENT}`,
      status: HttpStatus.NO_CONTENT

    };
  }
  public errorResponse(payload: IErrorResponse): IErrorResponse {
    return {
      ...payload,
      state: ResponseStateEnum.ERROR,
      error: null,
    };
  }

  /**
   * Most of your error response would probably be a 400 status code error
   *
   * @param message
   * @returns
   */
  public error400Response(message: string): IErrorResponse {
    return {
      message,
      error: null,
      code: `FXQL-${HttpStatus.BAD_REQUEST}`,
      status: HttpStatus.BAD_REQUEST

    };
  }

  public error404Response(message: string): IErrorResponse {
    return {
      message,
      error: null,
      code: `FXQL-${HttpStatus.NOT_FOUND}`,
      status: HttpStatus.NOT_FOUND

    };
  }

  public error409Response(message: string): IErrorResponse {
    return {
      message,
      error: null,
      code: `FXQL-${HttpStatus.CONFLICT}`,
      status: HttpStatus.CONFLICT


    };
  }

  public error403Response(message: string): IErrorResponse {
    return {
      message,
      error: null,
      code: `FXQL-${HttpStatus.FORBIDDEN}`,
      status: HttpStatus.FORBIDDEN
    };
  }
}
