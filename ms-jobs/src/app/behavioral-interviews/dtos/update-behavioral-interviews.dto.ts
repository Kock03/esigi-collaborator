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
import { HiringPreferencesEntity } from 'src/app/hiring-preferences/hiring-preferences.entity';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';
import { Situation } from '../enums/situational.enum';

export class UpdateBehaviorInterviewsDto {

  @IsString()
  @IsOptional()
  @MinLength(1)
  @ApiProperty()
  nameCandidate: string;

  @IsOptional()
  @ApiProperty()
  @MinLength(1)
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
  comments: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Situation)
  situational: Situation;

  @ApiProperty()
  @IsOptional()
  hiringPreference: HiringPreferencesEntity;

  @IsOptional()
  @ApiProperty()
  @IsString()
  availabilityOfInitialize: string;
}
