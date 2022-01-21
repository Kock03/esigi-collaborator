import { IsNotEmpty, Max, Min } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreateExperiencesDto {
  @IsNotEmpty()
  @Min(2)
  @Max(40)
  position: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  companyName: string;

  @IsNotEmpty()
  @Min(2)
  @Max(40)
  location: string;

  currentPosition: boolean;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @Min(2)
  @Max(40)
  sector: string;

  @IsNotEmpty()
  @Min(2)
  @Max(10)
  description: string;

  @IsNotEmpty()
  resume: ResumesEntity;
}
