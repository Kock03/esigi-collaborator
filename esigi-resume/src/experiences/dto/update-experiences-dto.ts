import { IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class UpdateExperiencesDto {
  @IsNotEmpty()
  @Min(2)
  @Max(40)
  office: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  companyName: string;

  @IsNotEmpty()
  @Min(2)
  @Max(40)
  locality: string;

  @IsOptional()
  active: boolean;

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
