import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class UpdateFeedbacksDto {
  @ApiProperty()
  @IsNotEmpty()
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsNotEmpty()
  reason: Reason;

  @ApiProperty()
  @IsNotEmpty()
  project: string;

  @ApiProperty()
  @IsNotEmpty()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  feedbackDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hourDate: string;

  @ApiProperty()
  @IsOptional()
  feedbackDateRetorn: Date;

  @ApiProperty()
  @IsOptional()
  hourDateRetorn: string;

  @ApiProperty()
  @IsNotEmpty()
  manager: string;

  @ApiProperty()
  @IsNotEmpty()
  managerDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  improvementPoints: string;

  @ApiProperty()
  @IsNotEmpty()
  collaboratorDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  commitment: string;

  @ApiProperty()
  @IsOptional()
  Collaborator: CollaboratorsEntity;
}
