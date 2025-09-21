import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "limits",
  timestamps: true,
})
export class Limit extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @IsUUID()
  id!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  @IsString()
  name!: string;

  @Column({
    type: DataType.DECIMAL(20, 8),
    allowNull: false,
    field: "max_amount",
  })
  @IsNumber()
  maxAmount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "max_daily_orders",
  })
  @IsNumber()
  maxDailyOrders!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  @IsBoolean()
  enabled!: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: "created_by",
  })
  @IsUUID()
  createdBy?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
