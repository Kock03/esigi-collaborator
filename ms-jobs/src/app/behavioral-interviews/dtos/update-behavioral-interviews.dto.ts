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
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Presentation } from '../enums/presentation.enum';
import { Punctuality } from '../enums/punctuality.enum';

export class UpdateBehaviorInterviewsDto {
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
  hiringPreference: string;

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
  @IsBoolean()
  situational: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  availabilityOfInitialize: string;
}
