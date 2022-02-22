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
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import { Situation } from 'src/app/behavioral-interviews/enums/situational.enum';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class UpdateTechnicalInterviewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
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
}
