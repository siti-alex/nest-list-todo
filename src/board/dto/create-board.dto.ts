import { IsInt, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsInt()
  readonly userId: number;
  @IsString()
  readonly description: string;
}
