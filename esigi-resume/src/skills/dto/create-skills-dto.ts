import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Level } from './level.enum';


export class CreateSkillsDto {
  @IsNotEmpty()
  technology: string;

  @IsNotEmpty()
  yearsExperience: string;

  @IsNotEmpty()
  seniority: Level;

  @IsNotEmpty()
  currentPosition: boolean;

  @IsNotEmpty()
  resume: ResumesEntity;
}
