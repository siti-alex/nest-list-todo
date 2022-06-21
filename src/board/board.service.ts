import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepostitory: typeof Board) {}

  async createBoard(dto: CreateBoardDto) {
    const board = await this.boardRepostitory.create(dto);
    return board;
  }

  async getAllBoards() {
    const boards = await this.boardRepostitory.findAll({
      include: { all: true },
    });
    return boards;
  }

  async getById(id) {
    const board = await this.boardRepostitory.findByPk(id);
    if (board) {
      return board;
    } else return 'Доска не найдена';
  }
}
