
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';
import { TypeOfPeriod } from './type-of-period.enum';

export class CreateSkillsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  yearsExperience: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
Resume: ResumesEntity;
}
