import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';

export class CreateBehaviorInterviewsDto {
  @ApiProperty()
  nameCandidate: string;

  @ApiProperty()
  techRecruter: string;

  @ApiProperty()
  behavioralInterviewDate: Date;

  @ApiProperty()
  hourInterview: string;

  @ApiProperty()
  punctuality: Punctuality;

  @ApiProperty()
  presentation: Presentation;

  @ApiProperty()
  salaryExpectation: string;

  @ApiProperty()
  hiringPreference: string;

  @ApiProperty()
  behavioralAssessment: string;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  situational: boolean;

  @ApiProperty()
  availabilityOfInitialize: string;

  @ApiProperty()
  @IsOptional()
  jobs: JobsEntity[];
}
