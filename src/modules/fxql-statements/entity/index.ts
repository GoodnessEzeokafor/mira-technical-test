import { BaseEntity } from "src/shared";

export class FxqlEntity extends BaseEntity {
    sourceCurrency: string
    destinationCurrency: string
    buy: number
    sell: number
    cap: number
}