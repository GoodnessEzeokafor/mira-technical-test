import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeGenericRepository } from './sequelize-generic-repository.service';
import { Fxql } from './models/fxql';
import { IDatabaseServices } from './abstracts';

@Injectable()
export class SequelizeDatabaseServices
  implements IDatabaseServices, OnApplicationBootstrap {
  fxql: SequelizeGenericRepository<Fxql>;


  onApplicationBootstrap() {
    this.fxql = new SequelizeGenericRepository<Fxql>(Fxql);
  }
}
