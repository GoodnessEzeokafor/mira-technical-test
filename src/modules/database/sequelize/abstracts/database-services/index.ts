
import { IGenericRepository } from "../generic-repository";
import { FxqlEntity } from "src/modules/fxql-statements/entity";

export abstract class IDatabaseServices {
    abstract fxql: IGenericRepository<FxqlEntity>
}

export abstract class IDatabaseHelperServices {
    abstract transaction(func: Function);
}
