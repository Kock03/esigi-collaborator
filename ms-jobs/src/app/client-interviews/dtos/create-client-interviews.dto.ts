import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateClientInterviewsDto {
  @ApiProperty()
  @IsNotEmpty()
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  evaluator: string;

  @ApiProperty()
  @IsNotEmpty()
  clientInterviewDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hourInterview: Date;

  @ApiProperty()
  @IsNotEmpty()
  punctuality: Punctuality;

  @ApiProperty()
  @IsNotEmpty()
  jobProfile: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalEvaluation: string;

  @ApiProperty()
  @IsNotEmpty()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  situational: boolean;

  @ApiProperty()
  @IsNotEmpty()
  jobs: JobsEntity[];
}
