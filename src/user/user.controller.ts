import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBoardDto } from '../board/dto/create-board.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }

  @Get()
  // @UseGuards(JwtAuthGuard)
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('addBoard')
  addBoard(@Body() boardDto: CreateBoardDto) {
    return this.userService.addBoard(boardDto);
  }

  @Get(':id')
  getUserByLogin(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
  @Post('change/:id')
  changeFio(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserDto) {
    return this.userService.changeFio(id, dto);
  }
}
