
export interface FindAllOptions {
  selectFields?: string[];
  relationFields?: Record<string, any>[];
}

export interface FindOneOptions extends FindAllOptions {
  relationIds?: boolean;
}

export interface CreateOptions {
  transaction?: any; // Sequelize transaction object
}

export interface LengthOptions {
  filter: Partial<any>;
}

export interface UpdateOptions {
  transaction?: any; // Sequelize transaction object
}

export interface DeleteOptions {
  transaction?: any; // Sequelize transaction object
}

export interface BulkCreateOptions {
  transaction?: any; // Sequelize transaction object
}

