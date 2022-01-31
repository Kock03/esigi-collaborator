import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency-level.enum';
import { Idiom } from './idioms.enum';

export class CreateIdiomsDto {
  @IsNotEmpty()
  idiom: Idiom;

  @IsNotEmpty()
  fluency: Fluency;

  @IsNotEmpty()
  resume: ResumesEntity;
}
