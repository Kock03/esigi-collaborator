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
import { Status } from '../enums/status.enum';

export class CreateFeedbacksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FeedbackTypes)
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  feedbackDate: string;

  @ApiProperty()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
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
