import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { UserBoard } from './UserBoard.model';
import { User } from '../user/entity/user.model';
import { ManyToOne } from 'typeorm';
import { Task } from '../task/task.model';

interface BoardModel {
  description: string;
}
@Table({ tableName: 'boards' })
export class Board extends Model<Board, BoardModel> {
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

  @HasMany(() => Task)
  tasks: Task[];
}
