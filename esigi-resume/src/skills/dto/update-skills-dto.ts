import { IsNotEmpty } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Level } from './level.enum';
import { TechnologyType } from './technology -type. enum';

export class UpdateSkillsDto {
  @IsNotEmpty()
  technology: TechnologyType;

  @IsNotEmpty()
  periodExperience: string;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  resume: ResumesEntity;
}
