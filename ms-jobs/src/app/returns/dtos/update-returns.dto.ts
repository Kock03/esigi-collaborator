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
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Reason } from '../enums/reason.enum';
import { TypeContract } from '../enums/type-contract.enum';

export class UpdateReturnsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  nameCandidate: string;

  @ApiProperty()
  @IsOptional()
  dateOfReturn: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Situation)
  behavioralEvaluation: Situation;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  @IsBoolean()
  returnOfCandidate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeContract)
  typeOdContract: TypeContract;

  @ApiProperty()
  @IsOptional()
  @IsString()
  combinedValue: string;

  @ApiProperty()
  @IsOptional()
  initialData: Date;

}
