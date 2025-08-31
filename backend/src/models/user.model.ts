import { IsEmail, IsString, IsUUID } from "class-validator";
import { DataTypes } from "sequelize";
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

enum UserRole {
  customer = "customer",
  admin = "admin",
}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  @IsUUID()
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  passwordHash!: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.customer,
  })
  role!: UserRole;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
