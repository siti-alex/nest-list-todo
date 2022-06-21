import { Injectable } from '@nestjs/common';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Board } from '../board/board.model';

interface TaskCreationAttrs {
  title: string;
  description: string;
  boardId: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
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
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    defaultValue: false,
  })
  complete: boolean;

  @Column({
    type: DataType.DATE,
    unique: false,
    allowNull: true,
  })
  dateComplete: string;

  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;
}
