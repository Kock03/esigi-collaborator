import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';
export declare class CreateFeedbacksDto {
    feedbackType: FeedbackTypes;
    reason: Reason;
    project: string;
    collaborator: string;
    status: Status;
    feedbackDate: Date;
    hourDate: string;
    feedbackDateRetorn: Date;
    hourDateRetorn: string;
    manager: string;
    managerDescription: string;
    improvementPoints: string;
    collaboratorDescription: string;
    commitment: string;
}
