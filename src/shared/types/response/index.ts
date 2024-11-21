import { HttpStatus } from '@nestjs/common';
import { ResponseStateEnum } from 'src/shared/enum/response';



export type ISuccessResponse = {
  message: string;
  token?: string;
  data: Record<string, any> | string | number | boolean | any;
  status?: HttpStatus;
  state?: ResponseStateEnum;
  code?: string
  pagination?: {
    hasPrevious: boolean;
    prevPage: number;
    hasNext: boolean;
    next: number;
    currentPage: number;
    pageSize: number;
    lastPage: number;
    total: any;
  };
};

export type IErrorResponse = {
  status?: HttpStatus;
  code?: string
  message: string;
  error?: null;
  state?: ResponseStateEnum;
};
export type IResponse = ISuccessResponse | IErrorResponse;
