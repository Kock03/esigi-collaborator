import { ApiProperty } from '@nestjs/swagger';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';

export class UpdateBehaviorInterviewsDto {
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
  jobs: JobsEntity[];
}
