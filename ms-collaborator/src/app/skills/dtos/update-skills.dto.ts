import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Seniority } from './seniority.enun';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  currentPosition: boolean;
}
