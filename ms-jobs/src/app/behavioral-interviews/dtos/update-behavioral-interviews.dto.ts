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
import { HiringPreferencesEntity } from 'src/app/hiringPreferences/hiringPreferences.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';
import { Situation } from '../enums/situational.enum';

export class UpdateBehaviorInterviewsDto {
  @MinLength(3)
  @MaxLength(80)
  @IsString()
  @IsOptional()
  @ApiProperty()
  nameCandidate: string;

  @IsOptional()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(80)
  @IsString()
  techRecruter: string;

  @IsOptional()
  @ApiProperty()
  behavioralInterviewDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsString()
  hourInterview: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Punctuality)
  punctuality: Punctuality;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Presentation)
  presentation: Presentation;

  @IsOptional()
  @ApiProperty()
  @IsString()
  salaryExpectation: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  hiringPreference: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  behavioralAssessment: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  comments: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Situation)
  situational: Situation;

  @ApiProperty()
  @IsOptional()
  hiringPreferences: HiringPreferencesEntity;

  @IsOptional()
  @ApiProperty()
  @IsString()
  availabilityOfInitialize: string;
}


