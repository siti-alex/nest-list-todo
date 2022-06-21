import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
    // const board = this.taskService.getBoardById(dto.boardId);
    // if (board) {
    //   return this.taskService.create(dto);
    // } else {
    //   throw new HttpException('Таблица не найдена', HttpStatus.NOT_FOUND);
    // }
  }

  @Get()
  getAllTasks() {
    return this.taskService.getAll();
  }
}
