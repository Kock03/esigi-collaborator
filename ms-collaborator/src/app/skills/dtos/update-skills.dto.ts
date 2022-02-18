import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Seniority } from './seniority.enun';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  technology: string;


  @ApiProperty()
  @IsOptional()
  @IsEnum(Seniority)
  seniority: Seniority;


  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(1)
  @MaxLength(2)
  yearsExperience: number;


  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;
}
