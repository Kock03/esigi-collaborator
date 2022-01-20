import { ResumesEntity } from 'src/resumes/resumes.entity';

export interface UpdateExperiencesDto {
  position: string;
  companyName: string;
  location: string;
  currentPosition: boolean;
  startDate: Date;
  endDate: Date;
  sector: string;
  description: string;
  resume: ResumesEntity;
}
