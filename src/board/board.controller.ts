import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // @Post()
  // create(@Body() dto: CreateBoardDto) {
  //   return this.boardService.createBoard(dto);
  // }

  @Get()
  getAll() {
    return this.boardService.getAllBoards();
  }
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.getBoardById(id);
  }
  @Post('change/:id')
  changeBoardDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBoardDto,
  ) {
    return this.boardService.changeDescription(id, dto);
  }
  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.deleteBoardById(id);
  }
}
