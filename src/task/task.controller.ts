import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
  }

  @Get()
  getAllTasks() {
    return this.taskService.getAll();
  }

  @Get(':id')
  getTasksByBoardId(@Param() params) {
    console.log(params.id);
    return this.taskService.getTasksByBoardId(params.id);
  }
}
