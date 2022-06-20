import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Board } from './board.model';
import { User } from '../user/entity/user.model';

@Table({ tableName: 'UserBoard', createdAt: false, updatedAt: false })
export class UserBoard extends Model<UserBoard> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER })
  boardId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
