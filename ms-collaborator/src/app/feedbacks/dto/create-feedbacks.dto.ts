import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class CreateFeedbacksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  project: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feedbackDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hourDate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  feedbackDateRetorn: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hourDateRetorn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manager: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  managerDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  improvementPoints: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  collaboratorDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  commitment: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
