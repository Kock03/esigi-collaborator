import { IsNotEmpty, Min, Max, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { EducationLevel } from './education-level.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @IsNotEmpty()
  educationLevel: EducationLevel;

  @IsNotEmpty()
  situation: Situation;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  institution: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  course: string;

  @IsNotEmpty()
  resume: ResumesEntity;
}
