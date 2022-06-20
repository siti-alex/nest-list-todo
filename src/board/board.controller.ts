import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('create')
  create(@Body() dto: CreateBoardDto) {
    return this.boardService.createBoard(dto);
  }
}
