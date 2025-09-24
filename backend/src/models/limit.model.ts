import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'limits',
  timestamps: true,
})
export class Limit extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    validate: {
      isUUID: 4,
    },
  })
  id!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100],
    },
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL(20, 8),
    allowNull: false,
    field: 'max_amount',
    validate: {
      isDecimal: true,
      min: 0,
    },
  })
  maxAmount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'max_daily_orders',
    validate: {
      isInt: true,
      min: 0,
    },
  })
  maxDailyOrders!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  enabled!: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'created_by',
    validate: {
      isUUID: {
        args: 4,
        msg: 'createdBy must be a valid UUID',
      },
    },
  })
  createdBy?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
