import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from '../board/board.model';
import { Task } from './task.model';
import { BoardService } from '../board/board.service';
import { BoardModule } from '../board/board.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    SequelizeModule.forFeature([Board, Task]),
    forwardRef(() => BoardModule),
  ],
  exports: [TaskService],
})
export class TaskModule {}
