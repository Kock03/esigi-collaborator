import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateFeedbacksDto } from './dto/create-feedbacks.dto';
import { UpdateFeedbacksDto } from './dto/update-feedbacks.dto';
import { FeedbacksEntity } from './feedbacks.entity';
export declare class FeedbacksService {
    private readonly feedbacksRepository;
    constructor(feedbacksRepository: Repository<FeedbacksEntity>);
    findAll(): Promise<FeedbacksEntity[]>;
    findOneOrFail(conditions: FindConditions<FeedbacksEntity>, options?: FindOneOptions<FeedbacksEntity>): Promise<FeedbacksEntity>;
    store(data: CreateFeedbacksDto): Promise<FeedbacksEntity>;
    update(id: string, data: UpdateFeedbacksDto): Promise<FeedbacksEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
