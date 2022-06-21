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
    return this.taskService.getTasksByBoardId(params.id);
  }

  @Post('setComplete/:id')
  setComplete(@Param() params) {
    return this.taskService.setComplete(params.id);
  }
}
