import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  course: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  schooling: Schooling;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  institution: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  situation: Situation;
}
