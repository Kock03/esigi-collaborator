import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
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
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateFeedbacksDto) {
    const feedbacks = this.feedbacksRepository.create(data);
    return await this.feedbacksRepository.save(feedbacks);
  }

  async viewFeedbacks(collaboratorId): Promise<FeedbacksEntity[]> {
    return await this.feedbacksRepository.find({
      where: {
        collaborator: collaboratorId
      },
      relations: ['collaborator'],
  });
  }

  async update(id: string, data: UpdateFeedbacksDto) {
    const feedbacks = await this.feedbacksRepository.findOneOrFail({ id });
    if (!feedbacks) {
      throw new NotFoundException();
    }
    return await this.feedbacksRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.feedbacksRepository.findOne({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.feedbacksRepository.softDelete({ id });
  }
}
