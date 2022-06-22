import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

  async createBoard(dto: CreateBoardDto) {
    try {
      const board = await this.boardRepository.create(dto);
      return board;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getAllBoards() {
    try {
      const boards = await this.boardRepository.findAll({
        include: { all: true },
      });
      return boards;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getBoardById(id: number) {
    try {
      const board = await this.boardRepository.findByPk(id);
      if (board) {
        return board;
      } else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async deleteBoardById(id: number) {
    try {
      const board = await this.boardRepository.findByPk(id);
      if (board) {
        await board.destroy();
        return `Доска под номером ${id} успешно удалена`;
      } else throw new HttpException('Доска не найдена', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async changeDescription(id: number, dto: CreateBoardDto) {
    try {
      const board = await this.boardRepository.findByPk(id);
      if (board) {
        board.description = dto.description;
        await board.save();
        return 'Описание изменено';
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}
