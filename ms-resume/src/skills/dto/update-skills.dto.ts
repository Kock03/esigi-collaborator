import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';
import { TypeOfPeriod } from './type-of-period.enum';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  technology: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  yearsExperience: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  Resume: ResumesEntity;
}
