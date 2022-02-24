import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HiringPreferencesEntity } from 'src/app/hiringPreferences/hiringPreferences.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';
import { Situation } from '../enums/situational.enum';

export class CreateBehaviorInterviewsDto {
  @MinLength(3)
  @MaxLength(80)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameCandidate: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(80)
  @IsString()
  techRecruter: string;

  @IsNotEmpty()
  @ApiProperty()
  behavioralInterviewDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  hourInterview: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Presentation)
  presentation: Presentation;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  salaryExpectation: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  behavioralAssessment: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  comments: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Situation)
  situational: Situation;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  availabilityOfInitialize: string;

  @ApiProperty()
  hiringPreferences: HiringPreferencesEntity;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;
}
