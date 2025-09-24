import { Model } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "assets",
  timestamps: true,
})
export class Asset extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  symbol!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  enabled!: boolean;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "created_by",
  })
  createdBy!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
