import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';

export class UpdateBehaviorInterviewsDto {
  @IsNotEmpty()
  @ApiProperty()
  nameCandidate: string;

  @IsNotEmpty()
  @ApiProperty()
  techRecruter: string;

  @IsNotEmpty()
  @ApiProperty()
  behavioralInterviewDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  hourInterview: string;

  @IsNotEmpty()
  @ApiProperty()
  punctuality: Punctuality;

  @IsNotEmpty()
  @ApiProperty()
  presentation: Presentation;

  @IsNotEmpty()
  @ApiProperty()
  salaryExpectation: string;

  @IsNotEmpty()
  @ApiProperty()
  hiringPreference: string;

  @IsNotEmpty()
  @ApiProperty()
  behavioralAssessment: string;

  @IsNotEmpty()
  @ApiProperty()
  comments: string;

  @IsNotEmpty()
  @ApiProperty()
  situational: boolean;

  @IsNotEmpty()
  @ApiProperty()
  availabilityOfInitialize: string;
}
