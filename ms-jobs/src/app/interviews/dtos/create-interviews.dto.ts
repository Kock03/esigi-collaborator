import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { ReturnsEntity } from 'src/app/returns/returns.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { IsNull } from 'typeorm';

export class CreateInterviewsDto {
  @ApiProperty()
  @IsOptional()
  BehavioralInterviews: BehavioralInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  TechnicalInterviews: TechnicalInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  ClientInterviews: ClientInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  Returns: ReturnsEntity;

  @ApiProperty()
  @IsOptional()
  Job: JobsEntity;
}
