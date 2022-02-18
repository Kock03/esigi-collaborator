import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { JobsController } from 'src/app/jobs/jobs.controller';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Reason } from '../enums/reason.enum';
import { TypeContract } from '../enums/type-contract.enum';

export class CreateReturnsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  returnDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  bahvioralAssessment: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  technicalAssessment: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bahvioralAssessmentDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalAssessmentDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  candidateReturn: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeContract)
  typeContract: TypeContract;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  closedValue: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  job: JobsEntity;
}
