import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Level } from './level.enum';
import { TechnologyType } from './technology -type. enum';

export interface UpdateSkillsDto {
  technology: TechnologyType;
  periodExperience: string;
  level: Level;
  resume: ResumesEntity;
}
