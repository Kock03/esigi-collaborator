import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Situation } from 'src/app/behavioral-interviews/enums/situational.enum';
import { JobsController } from 'src/app/jobs/jobs.controller';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Reason } from '../enums/reason.enum';
import { ReturnOfCandidate } from '../enums/return-of-candidate';
import { TypeContract } from '../enums/type-contract.enum';

export class CreateReturnsDto {



  @ApiProperty()
  @IsNotEmpty()
  dateReturn: string;

  @ApiProperty()
  @IsOptional()
  dateOfReturn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  behavioralEvaluation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  technicalEvaluation: Situation;

  @ApiProperty()
  @IsOptional()
  @IsString()
  behavioralEvaluationComent: string;

  @ApiProperty()
  @IsOptional()
  technicalEvaluationComent: string;

  @ApiProperty()
  @IsEnum(ReturnOfCandidate)
  returnOfCandidate: ReturnOfCandidate;

  @ApiProperty()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeContract)
  typeOdContract: TypeContract;

  @ApiProperty()
  @IsOptional()
  @IsString()
  combinedValue: string;

  @ApiProperty()
  @IsOptional()
  initialData: string;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;
}
