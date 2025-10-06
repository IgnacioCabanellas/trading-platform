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
  tableName: 'assets',
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
  createdBy!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
