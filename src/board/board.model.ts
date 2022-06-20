import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserBoard } from './UserBoard.model';
import { User } from '../user/entity/user.model';

interface BoardModel {
  description: string;
}
@Table({ tableName: 'boards' })
export class Board extends Model<Board> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => User, () => UserBoard)
  users: User[];
}
