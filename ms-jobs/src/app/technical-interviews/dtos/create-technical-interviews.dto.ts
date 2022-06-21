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
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { Situation } from 'src/app/behavioral-interviews/enums/situational.enum';
import { InterviewsEnitiy } from 'src/app/interviews/interviews.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateTechnicalInterviewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  evaluator: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalInterviewDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hourInterview: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  jobProfile: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  technicalEvaluation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  situational: Situation;

  @ApiProperty()
  @IsOptional()
  Interview: InterviewsEnitiy;
}
