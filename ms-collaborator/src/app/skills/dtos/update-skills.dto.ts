import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  seniority: Senioridade;

  @ApiProperty()
  @IsNotEmpty()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  currentPosition: boolean;
}
