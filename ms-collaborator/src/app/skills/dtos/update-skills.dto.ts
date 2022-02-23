import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Seniority } from './seniority.enun';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  technology: string;


  @ApiProperty()
  @IsOptional()
  @IsNumber()
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
