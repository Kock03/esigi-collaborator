import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @ApiProperty()
  @IsNotEmpty()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  situation: Situation;
}
