import { Transaction } from 'sequelize';
import { FindAllOptions, FindOneOptions, DeleteOptions, UpdateOptions, BulkCreateOptions } from 'src/shared';

export abstract class IGenericRepository<T> {
  abstract findAllWithPagination(
    query?: any,
    options?: FindAllOptions,
  ): Promise<{
    data: any;
    pagination: {
      hasPrevious: boolean;
      prevPage: number;
      hasNext: boolean;
      next: number;
      currentPage: number;
      pageSize: number;
      lastPage: number;
      total: any;
    };
  }>;

  abstract create(
    payload: Partial<T>,
    options?: { transaction?: Transaction },
  ): Promise<T>;
  abstract length(filter: Partial<T>): Promise<number>;
  abstract findOne(
    key: Partial<T> | Partial<T>[] | any,
    options?: FindOneOptions,
  ): Promise<T | null>;

  abstract update(
    key: any,
    payload: Partial<T>,
    options?: UpdateOptions | any,
  );
  abstract delete(key: Partial<T>, options?: DeleteOptions);
  abstract bulkCreate(payload: Partial<T[]>, options?: BulkCreateOptions);
  abstract find(where: any, options?: FindAllOptions): Promise<T[]>;

  abstract decrement(
    key: Partial<T>,
    payload: Record<string, number>,
    options?: UpdateOptions,
  );

  abstract increment(
    key: Partial<T>,
    payload: Record<string, number>,
    options?: UpdateOptions,
  );
  abstract query(sql: string);
}


