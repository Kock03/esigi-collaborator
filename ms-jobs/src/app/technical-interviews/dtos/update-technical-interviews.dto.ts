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

export class UpdateTechnicalInterviewsDto {


  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  collaboratorRequesterId: string;

  @ApiProperty()
  @IsOptional()
  technicalInterviewDate: string;

  @ApiProperty()
  @IsOptional()
  hourInterview: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  jobProfile: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  technicalEvaluation: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Situation)
  situational: Situation;
}


