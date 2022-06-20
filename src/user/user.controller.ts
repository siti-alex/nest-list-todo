import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBoardDto } from '../board/dto/create-board.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('addBoard')
  addBoard(@Body() boardDto: CreateBoardDto) {
    return this.userService.addBoard(boardDto);
  }
}
