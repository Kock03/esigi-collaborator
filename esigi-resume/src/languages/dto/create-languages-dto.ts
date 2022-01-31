import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency.enum';

export class CreateLanguagesDto {
  @IsNotEmpty()
  languageName: string;

  @IsNotEmpty()
  degreeOfInfluence: Fluency;

  @IsNotEmpty()
  resume: ResumesEntity;
}
