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
import { Situation } from 'src/app/behavioral-interviews/enums/situational.enum';
import { JobsController } from 'src/app/jobs/jobs.controller';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Reason } from '../enums/reason.enum';
import { TypeContract } from '../enums/type-contract.enum';

export class CreateReturnsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  dateOfReturn: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  behavioralEvaluation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  technicalEvaluation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  behavioralEvaluationComent: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalEvaluationComent: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  returnOfCandidate: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeContract)
  typeOdContract: TypeContract;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  combinedValue: string;

  @ApiProperty()
  @IsNotEmpty()
  initialData: Date;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;
}
