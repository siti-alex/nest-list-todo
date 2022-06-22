import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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
  getTasksByBoardId(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTasksByBoardId(id);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post('setComplete/:id')
  setComplete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.setComplete(id);
  }
  @Delete('delete/:id')
  removeTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTaskById(id);
  }

  @Post('change/:id')
  changeTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.changeTask(id, dto);
  }
}
