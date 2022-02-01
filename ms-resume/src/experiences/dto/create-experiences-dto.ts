import {
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreateExperiencesDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  office: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  companyName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  locality: string;

  @IsOptional()
  active: boolean;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  sector: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  resume: ResumesEntity;
}
