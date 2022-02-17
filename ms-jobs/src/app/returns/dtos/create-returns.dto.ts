import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JobsController } from 'src/app/jobs/jobs.controller';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Reason } from '../enums/reason.enum';
import { TypeContract } from '../enums/type-contract.enum';

export class CreateReturnsDto {
  @ApiProperty()
  @IsNotEmpty()
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  returnDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  bahvioralAssessment: boolean;

  @ApiProperty()
  @IsNotEmpty()
  technicalAssessment: boolean;

  @ApiProperty()
  @IsNotEmpty()
  bahvioralAssessmentDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalAssessmentDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  candidateReturn: boolean;

  @ApiProperty()
  @IsNotEmpty()
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  typeContract: TypeContract;

  @ApiProperty()
  @IsNotEmpty()
  closedValue: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  job: JobsEntity;
}
