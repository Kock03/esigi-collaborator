import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';

export class CreateSkillsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(70)
  technology: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(5)
  yearsExperience: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(1)
  seniority: Seniority;

  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;

  @IsNotEmpty()
  @IsObject()
  resume: ResumesEntity;
}
