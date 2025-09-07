import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreatedAt,
  DataType,
  Default,
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
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  @IsUUID()
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  name!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  @IsNumber()
  maxAmount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @IsNumber()
  maxDailyOrders!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  @IsBoolean()
  @Default(false)
  enabled!: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  @IsUUID()
  createdBy?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
