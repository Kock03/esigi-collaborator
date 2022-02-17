import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateFeedbacksDto } from './dto/create-feedbacks.dto';
import { UpdateFeedbacksDto } from './dto/update-feedbacks.dto';
import { FeedbacksEntity } from './feedbacks.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbacksEntity)
    private readonly feedbacksRepository: Repository<FeedbacksEntity>,
  ) {}

  async findAll() {
    return await this.feedbacksRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<FeedbacksEntity>,
    options?: FindOneOptions<FeedbacksEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.feedbacksRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateFeedbacksDto) {
    const feedbacks = this.feedbacksRepository.create(data);
    return await this.feedbacksRepository.save(feedbacks);
  }

  async update(id: string, data: UpdateFeedbacksDto) {
    const feedbacks = await this.feedbacksRepository.findOneOrFail({ id });
    if (!feedbacks) {
      throw new HttpException('Not Found', 404);
    }
    return await this.feedbacksRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.feedbacksRepository.findOne({ id });
    return await this.feedbacksRepository.softDelete({ id });
  }
}
