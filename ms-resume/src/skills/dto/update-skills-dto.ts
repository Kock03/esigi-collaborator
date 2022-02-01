import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';

export class UpdateSkillsDto {
  @IsNotEmpty()
  technology: string;

  @IsNotEmpty()
  yearsExperience: string;

  @IsNotEmpty()
  seniority: Seniority;

  @IsNotEmpty()
  currentPosition: boolean;

  @IsNotEmpty()
  resume: ResumesEntity;
}
