
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class CreateFeedbacksDto {

  @IsNotEmpty()
  feedbackType: FeedbackTypes;

  @IsNotEmpty()
  reason: Reason;

  @IsNotEmpty()
  project: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  feedbackDate: Date;

  @IsNotEmpty()
  hourDate: string;

  //@IsOptional()
  //feedbackDateRetorn: Date;

  //@IsOptional()
  //hourDateRetorn: string;

  @IsNotEmpty()
  manager: string;

  @IsNotEmpty()
  managerDescription: string;

  @IsNotEmpty()
  improvementPoints: string;

  @IsNotEmpty()
  collaboratorDescription: string;

  @IsNotEmpty()
  commitment: string;

  @IsOptional()
  Collaborator: CollaboratorsEntity;

}
