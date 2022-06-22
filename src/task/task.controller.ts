import {
  Body,
  Controller,
  Delete,
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

  @Get('board/:id')
  getTasksByBoardId(@Param() params) {
    return this.taskService.getTasksByBoardId(params.id);
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post('setComplete/:id')
  setComplete(@Param() params) {
    return this.taskService.setComplete(params.id);
  }
  @Delete('delete/:id')
  removeTask(@Param() params) {
    return this.taskService.deleteTaskById(params.id);
  }

  @Post('change/:id')
  changeTask(@Param('id') id: number, @Body() dto: CreateTaskDto) {
    return this.taskService.changeTask(id, dto);
  }
}
