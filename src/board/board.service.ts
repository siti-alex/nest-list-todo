import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepostitory: typeof Board) {}

  async createBoard(dto: CreateBoardDto) {
    const board = await this.boardRepostitory.create(dto);
    return board;
  }
}
