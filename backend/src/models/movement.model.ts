import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

export class Movement extends Model {
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
    type: DataType.DOUBLE,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.CHAR(1),
    field: 'movement_type',
    allowNull: false,
  })
  movementType!: MovementType;

  @Column({
    type: DataType.UUID,
    field: 'balance_id',
    allowNull: false,
  })
  balanceId!: string;

  @Column({
    type: DataType.UUID,
    field: 'order_match_id',
  })
  orderMatchId: string | undefined;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export enum MovementType {
  DEPOSIT = 'D',
  WITHDRAW = 'W',
}
