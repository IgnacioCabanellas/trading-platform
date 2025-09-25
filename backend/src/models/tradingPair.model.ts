import { Model } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'trading_pairs',
  timestamps: true,
})
export class TradingPair extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    field: 'base_asset_id',
  })
  baseAssetId!: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    field: 'quote_asset_id',
  })
  quoteAssetId!: string;

  @Column({
    type: DataType.UUID,
    field: 'created_by',
    validate: {
      isUUID: {
        args: 4,
        msg: 'createdBy must be a valid UUID',
      },
    },
  })
  createdBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  enabled!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
