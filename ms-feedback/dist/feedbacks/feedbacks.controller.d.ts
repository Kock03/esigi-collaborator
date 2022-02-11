import { CreateFeedbacksDto } from './dto/create-feedbacks.dto';
import { UpdateFeedbacksDto } from './dto/update-feedbacks.dto';
import { FeedbacksService } from './feedbacks.service';
export declare class FeedbacksController {
    private readonly feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    index(): Promise<import("./feedbacks.entity").FeedbacksEntity[]>;
    show(id: string): Promise<import("./feedbacks.entity").FeedbacksEntity>;
    store(body: CreateFeedbacksDto): Promise<import("./feedbacks.entity").FeedbacksEntity>;
    update(id: string, body: UpdateFeedbacksDto): Promise<import("./feedbacks.entity").FeedbacksEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
