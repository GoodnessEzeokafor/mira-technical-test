/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IDatabaseHelperServices } from './abstracts';

@Injectable()
export class SequelizeDatabaseHelperService implements IDatabaseHelperServices {
  constructor(private sequelize: Sequelize) { }
  async transaction(func: Function) {
    const transaction = await this.sequelize.transaction();
    try {
      await func(transaction);
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      throw err;
    }
  }
}
