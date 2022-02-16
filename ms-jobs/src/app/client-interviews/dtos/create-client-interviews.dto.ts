import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateClientInterviewsDto {
  @ApiProperty()
  nameCandidate: string;

  @ApiProperty()
  evaluator: string;

  @ApiProperty()
  clientInterviewDate: Date;

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
  @IsOptional()
  jobs: JobsEntity[];
}
