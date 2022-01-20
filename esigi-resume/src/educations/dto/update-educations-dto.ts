import { ResumesEntity } from 'src/resumes/resumes.entity';
import { EducationLevel } from './education-level.enum';
import { Situation } from './situation.enum';

export interface UpdateEducationsDto {
  educationLevel: EducationLevel;
  situation: Situation;
  institution: string;
  course: string;
  resume: ResumesEntity;
}
