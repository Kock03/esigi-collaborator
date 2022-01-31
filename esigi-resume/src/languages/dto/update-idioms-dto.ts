import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency-level.enum';


export class UpdateIdiomsDto {
  @IsNotEmpty()
  idiom: string;

  @IsNotEmpty()
  fluency: Fluency;

  @IsNotEmpty()
  resume: ResumesEntity;
}
