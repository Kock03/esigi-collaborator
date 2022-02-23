import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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
  @IsNumber()
  reason: Reason;

  @ApiProperty()
  @IsOptional()
  @IsString()
  project: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  status: Status;

  @ApiProperty()
  @IsOptional()
  @IsString()
  feedbackDate: Date;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  @IsString()
  manager: string;

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
}
