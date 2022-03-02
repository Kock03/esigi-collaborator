import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';

export class UpdateInterviewsDto {
  @ApiProperty()
  @IsOptional()
  behavioralInterviews: BehavioralInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  technicalInterviews: TechnicalInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  clientInterviews: ClientInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  jobs: JobsEntity;
}
