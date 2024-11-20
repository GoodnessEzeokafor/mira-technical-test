import { Model, BulkCreateOptions, CreateOptions, UpdateOptions } from 'sequelize';
import { DeleteOptions, FindAllOptions, FindOneOptions } from 'src/shared';
import { IGenericRepository } from './abstracts';

export class SequelizeGenericRepository<T extends Model>
  implements IGenericRepository<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async find(where: any, options?: FindAllOptions): Promise<T[]> {
    const data = await this.model.findAll({
      where,
      ...(options?.selectFields ? { attributes: options.selectFields } : {}),
      ...(options?.relationFields
        ? {
          include: options.relationFields,
        }
        : {}),
    });

    return JSON.parse(JSON.stringify(data));
  }

  async findAllWithPagination(
    query: any,
    options?: FindAllOptions,
  ): Promise<{ data: T[]; pagination: any }> {
    const { perPage = 10, page = 1, order = [['createdAt', 'DESC']] } = query;
    const perPageNumber = Math.abs(Number(perPage));

    const where: any = {};
    Object.keys(query).forEach((key) => {
      if (
        [
          'limit',
          'offset',
          'order',
          'perPage',
          'page',
          'q',
          'to',
          'from',
        ].includes(key)
      )
        return;
      where[key] = query[key];
    });

    const offset = (page - 1) * perPageNumber;

    const { rows, count } = await this.model.findAndCountAll({
      where,
      // order: [['createdAt', 'DESC']], // Stable sorting criterion
      order, // or [['createdAt', 'ASC'] for time-based stability
      limit: perPageNumber,
      offset,
      ...(options?.selectFields ? { attributes: options.selectFields } : {}),
      ...(options?.relationFields
        ? {
          include: options.relationFields,
        }
        : {}),
    });


    return {
      data: JSON.parse(JSON.stringify(rows)) as T[],
      pagination: {
        hasPrevious: page > 1,
        prevPage: page - 1,
        hasNext: page < Math.ceil(count / perPageNumber),
        next: page + 1,
        currentPage: Number(page),
        pageSize: perPageNumber,
        lastPage: Math.ceil(count / perPageNumber),
        total: count,
      },
    };
  }

  async findOne(
    key: Partial<T> | Partial<T>[],
    options?: FindOneOptions,
  ): Promise<T | null> {
    const where: any = {};
    Object.keys(key).forEach((k) => (where[k] = key[k]));
    const data = await this.model.findOne({
      where,
      ...(options?.selectFields ? { attributes: options.selectFields } : {}),
      ...(options?.relationFields
        ? {
          include: options.relationFields,
        }
        : {}),
    });

    return JSON.parse(JSON.stringify(data));
  }

  async create(payload: T, options?: CreateOptions): Promise<T> {
    return await this.model.create(payload, {
      ...(options?.transaction ? { transaction: options.transaction } : {}),
    });
  }

  async length(filter: Partial<T>): Promise<number> {
    return await this.model.count({ where: filter });
  }

  async update(key: Partial<T>, payload: Partial<T>, options?: UpdateOptions) {
    const where: any = {};
    Object.keys(key).forEach((k) => (where[k] = key[k]));

    return await this.model.update(payload, {
      where,
      ...(options?.transaction ? { transaction: options.transaction } : {}),
    });
  }
  async delete(key: Partial<T>, options?: DeleteOptions) {
    const where: any = {};
    Object.keys(key).forEach((k) => (where[k] = key[k]));
    return await this.model.update(
      { deletedAt: new Date() },
      {
        where,
        ...(options?.transaction ? { transaction: options.transaction } : {}),
      },
    );
  }

  async bulkCreate(payload: Partial<T[]>, options?: BulkCreateOptions) {
    return await this.model.bulkCreate(payload, {
      ...(options?.transaction ? { transaction: options.transaction } : {}),
    });
  }


  async increment(
    key: Partial<T>,
    payload: Record<string, number>,
    options?: UpdateOptions,
  ) {
    const where: any = {};
    Object.keys(key).forEach((k) => (where[k] = key[k]));
    return await this.model.increment(payload, {
      where,
      ...(options?.transaction ? { transaction: options.transaction } : {}),
    });
  }

  async decrement(
    key: Partial<T>,
    payload: Record<string, number>,
    options?: UpdateOptions,
  ) {
    const where: any = {};
    Object.keys(key).forEach((k) => (where[k] = key[k]));
    return await this.model.decrement(payload, {
      where,
      ...(options?.transaction ? { transaction: options.transaction } : {}),
    });
  }

  async query(sql: string) {
    const results = await this.model.sequelize.query(sql);
    return results[0];
  }
}
