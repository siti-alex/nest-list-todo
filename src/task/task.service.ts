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
    try {
      const task = await this.taskRepository.create(dto);
      return task;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async getTaskById(id: number) {
    try {
      const task = await this.taskRepository.findByPk(id);
      if (task) return task;
      else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getTasksByBoardId(boardId: number) {
    try {
      const tasks = await this.taskRepository.findAll({ where: { boardId } });
      if (tasks.length > 0) return tasks;
      else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async setComplete(id: number) {
    try {
      const task = await this.taskRepository.findByPk(id);
      if (task) {
        task.complete = !task.complete;
        if (!task.complete) {
          task.dateComplete = null;
        } else {
          task.dateComplete = new Date();
        }
        await task.save();
        return task;
      } else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async deleteTaskById(id: number) {
    try {
      const task = await this.taskRepository.findByPk(id);
      if (task) {
        await task.destroy();
        return `Задача под номером ${id} успешно удалена`;
      } else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
  async changeTask(id: number, dto: CreateTaskDto) {
    try {
      const task = await this.taskRepository.findByPk(id);
      if (task) {
        task.title = dto.title;
        task.description = dto.description;
        await task.save();
      } else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}
