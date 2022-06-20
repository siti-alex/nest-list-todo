import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entity/user.model';
import { Board } from './board.model';
import { UserBoard } from './UserBoard.model';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [SequelizeModule.forFeature([User, Board, UserBoard])],
  exports: [BoardService],
})
export class BoardModule {}
