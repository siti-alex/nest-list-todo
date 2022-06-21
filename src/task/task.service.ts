import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { BoardService } from '../board/board.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private boardService: BoardService,
  ) {}

  async create(dto: CreateTaskDto) {
    // const task = await this.taskRepository.create(dto);
    // return task;
    try {
      const board = this.boardService.getById(dto.boardId);
      const task = await this.taskRepository.create(dto);
      return task;
    } catch (e) {
      throw new HttpException('Таблица не найдена', HttpStatus.NOT_FOUND);
    }
    // const board = this.boardService.getById(dto.boardId);
    // if (board) {
    //   const task = await this.taskRepository.create(dto);
    //   return task;
    // } else {
    //   throw new HttpException('Таблица не найдена', HttpStatus.NOT_FOUND);
    // }
  }
  async getBoardById(id) {
    const board = this.boardService.getById(id);
    console.log(board);
    if (board) {
      return true;
    } else {
      return false;
    }
  }

  async getAll() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }
}
