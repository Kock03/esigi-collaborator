import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
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
  @MinLength(1)
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
  @MinLength(1)
  manager: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  managerDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  improvementPoints: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  collaboratorDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  commitment: string;

  
  @ApiPropertyOptional()
  @IsOptional()
  Collaborator: CollaboratorsEntity;
}
