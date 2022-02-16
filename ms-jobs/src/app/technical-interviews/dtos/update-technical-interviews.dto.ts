import { ApiProperty } from '@nestjs/swagger';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class UpdateTechnicalInterviewsDto {
  @ApiProperty()
  nameCandidate: string;

  @ApiProperty()
  evaluator: string;

  @ApiProperty()
  technicalInterviewDate: Date;

  @ApiProperty()
  hourInterview: Date;

  @ApiProperty()
  punctuality: Punctuality;

  @ApiProperty()
  jobProfile: string;

  @ApiProperty()
  technicalEvaluation: string;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  situational: boolean;

  @ApiProperty()
  jobs: JobsEntity[];
}
