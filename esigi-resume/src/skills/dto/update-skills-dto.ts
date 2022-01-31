import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Level } from './level.enum';


export class UpdateSkillsDto {
  @IsNotEmpty()
  technology: string;

  @IsNotEmpty()
  periodExperience: string;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  resume: ResumesEntity;
}
