import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class UpdateFeedbacksDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  project: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  feedbackDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourDate: string;

  @ApiProperty()
  @IsOptional()
  feedbackDateRetorn: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourDateRetorn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(70)
  manager: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  managerDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  improvementPoints: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  collaboratorDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  commitment: string;
}
