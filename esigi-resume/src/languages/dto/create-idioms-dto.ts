import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency-level.enum';


export class CreateIdiomsDto {
  @IsNotEmpty()
  languageName: string;

  @IsNotEmpty()
  degreeOfInfluence: Fluency;

  @IsNotEmpty()
  resume: ResumesEntity;
}
