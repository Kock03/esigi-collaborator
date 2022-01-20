import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency-level.enum';
import { Idiom } from './idioms.enum';

export interface CreateIdiomsDto {
  idiom: Idiom;
  fluency: Fluency;
  resume: ResumesEntity;
}
