import { IsBoolean, IsEmail, IsEnum, IsString, IsUUID } from "class-validator";
import { DataTypes } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

enum UserRole {
  user = "USER",
  admin = "ADMIN",
}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @IsUUID()
  id!: string;

  @Column({
    type: DataType.STRING(255),
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
  password!: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.user,
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'limit_id',
  })
  @IsUUID()
  limitId?: string;

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
    field: 'created_by',
  })
  @IsUUID()
  createdBy?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
