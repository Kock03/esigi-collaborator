import { IsNotEmpty, Min, Max } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { EducationLevel } from './education-level.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @IsNotEmpty()
  educationLevel: EducationLevel;

  @IsNotEmpty()
  situation: Situation;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  institution: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  course: string;

  @IsNotEmpty()
  resume: ResumesEntity;
}
