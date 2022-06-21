import { IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsInt()
  readonly boardId: number;
}
