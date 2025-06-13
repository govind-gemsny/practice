import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare roll_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password_hash: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare image: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare updated_at: Date;
}
