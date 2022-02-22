import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  course: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(10)
  @MaxLength(100)
  institution: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Situation)
  situation: Situation;
}
