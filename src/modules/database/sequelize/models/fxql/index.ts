import {
    Column,
    CreatedAt,
    DataType,
    Default,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { FxqlEntity } from 'src/modules/fxql-statements/entity';

@Table({
    tableName: 'fxqls',
    timestamps: true,
    paranoid: true,
})
export class Fxql extends Model<Fxql> implements FxqlEntity {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;



    @Column({ type: DataType.STRING, allowNull: true })
    sourceCurrency: string

    @Column({ type: DataType.STRING, allowNull: true })
    destinationCurrency: string;

    @Column({
        type: DataType.DECIMAL(15, 6).UNSIGNED, // Precision and scale
        defaultValue: 0, // Default value
    })
    buy: number;

    @Column({
        type: DataType.DECIMAL(15, 6).UNSIGNED, // Precision and scale
        defaultValue: 0, // Default value
    })
    sell: number;

    @Column({
        type: DataType.DECIMAL(15, 6).UNSIGNED, // Precision and scale
        defaultValue: 0, // Default value
    })
    cap: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;


}
