import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateInterviewsDto } from './dtos/create-interviews.dto';
import { UpdateInterviewsDto } from './dtos/update-interviews.dto';
import { InterviewsEnitiy } from './interviews.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(InterviewsEnitiy)
    private readonly interviewsRepository: Repository<InterviewsEnitiy>,
  ) {}

  async finAll() {
    return await this.interviewsRepository.find();
  }

  async findOnerOrFail(
    conditions: FindConditions<InterviewsEnitiy>,
    options?: FindOneOptions<InterviewsEnitiy>,
  ) {
    try {
      return await this.interviewsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async findInterviewsDetails(
    conditions: FindConditions<InterviewsEnitiy>,
    options?: FindOneOptions<InterviewsEnitiy>,
  ) {
    options = {
      relations: ['behaviroalInterviews', 'technicalInterviews'],
    };

    try {
      return await this.interviewsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async store(data: CreateInterviewsDto) {
    const interview = this.interviewsRepository.create(data);
    return await this.interviewsRepository.save(interview);
  }

  async update(id: string, data: UpdateInterviewsDto) {
    try {
      const interview = await this.interviewsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.interviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.interviewsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.interviewsRepository.softDelete({ id });
  }
}
