import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Seniority } from './seniority.enun';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  technology: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  yearsExperience: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;
}
