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
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRolesByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    return user;
  }

  async addBoard(dto: CreateBoardDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      // await user.$add('board', )
      const board = await this.boardService.createBoard(dto);
      await user.$add('board', board.id);
      return 'Добавлена таблица';
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }
}
