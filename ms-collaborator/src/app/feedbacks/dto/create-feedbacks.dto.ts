import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class CreateFeedbacksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FeedbackTypes)
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  project: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  feedbackDate: Date;

  @ApiProperty()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  manager: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  managerDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  improvementPoints: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  collaboratorDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  commitment: string;

  @ApiPropertyOptional()
  @IsOptional()
  Collaborator: CollaboratorsEntity;
}
