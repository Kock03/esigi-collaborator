import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';
import { TypeOfPeriod } from './type-of-period.enum';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  technology: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  yearsExperience: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;

  @ApiProperty()
  @IsOptional()
  seniority: Seniority;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
Resume: ResumesEntity;
}
