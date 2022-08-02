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
  projectId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  feedbackDate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourDate: string;

  @ApiProperty()
  @IsOptional()
  feedbackDateRetorn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourDateRetorn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  collaboratorManagerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  managerDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  improvementPoints: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  collaboratorDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  commitment: string;

  
  @ApiPropertyOptional()
  @IsOptional()
  Collaborator: CollaboratorsEntity;
}
