import { Injectable } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class DatabaseUtilsService {
  queryDbByDateFilter(
    query: { from?: string; to?: string },
    dateField = 'createdAt',
  ) {
    const { from, to } = query;
    const fromDate = from ? new Date(from) : from;
    const toDate = to ? new Date(to).setDate(new Date(to).getDate() + 1) : to;

    if (to && !from)
      return {
        [dateField]: {
          [Op.lte]: [toDate],
        },
      };
    if (!to && from)
      return {
        [dateField]: {
          [Op.gte]: [fromDate],
        },
      };
    if (to && from)
      return {
        [dateField]: {
          [Op.between]: [fromDate, toDate],
        },
      };

    return {} as WhereOptions<any>;
  }
}
