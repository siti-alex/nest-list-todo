import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from '../roles/roles.service';
import { CreateBoardDto } from '../board/dto/create-board.dto';
import { BoardService } from '../board/board.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private boardService: BoardService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRolesByValue('USER');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });
      return users;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getUserByLogin(login: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { login },
        include: { all: true },
      });
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user) return user;
      else
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user) {
        await user.destroy();
        return 'Пользователь удален';
      } else
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async changeFio(id: number, fio: string) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user) {
        user.fio = fio;
        return user;
      } else
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async addBoard(dto: CreateBoardDto) {
    try {
      const user = await this.userRepository.findByPk(dto.userId);
      if (user) {
        const board = await this.boardService.createBoard(dto);
        await user.$add('board', board.id);
        return 'Доска создана';
      } else
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}
