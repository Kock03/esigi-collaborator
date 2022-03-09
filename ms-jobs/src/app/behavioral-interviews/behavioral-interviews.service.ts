import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { JobsEntity } from '../jobs/jobs.entity';
import { BehavioralInterviewsEntity } from './behavioral-interviews.entity';
import { CreateBehaviorInterviewsDto } from './dtos/create-behavioral-interviews.dto';
import { UpdateBehaviorInterviewsDto } from './dtos/update-behavioral-interviews.dto';

@Injectable()
export class BehavioralInterviewsService {
  constructor(
    @InjectRepository(BehavioralInterviewsEntity)
    private readonly behavioralInterviewsRepository: Repository<BehavioralInterviewsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.behavioralInterviewsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<BehavioralInterviewsEntity>,
    options?: FindOneOptions<BehavioralInterviewsEntity>,
  ) {
    try {
      return await this.behavioralInterviewsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateBehaviorInterviewsDto) {
    const inertview = this.behavioralInterviewsRepository.create(data);
    return await this.behavioralInterviewsRepository.save(inertview);
  }

  async update(id: string, data: UpdateBehaviorInterviewsDto) {
    try {
      const inertview = await this.behavioralInterviewsRepository.findOneOrFail(
        {
          id,
        },
      );
    } catch {
      throw new NotFoundException();
    }
    return await this.behavioralInterviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.behavioralInterviewsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.behavioralInterviewsRepository.softDelete({ id });
  }
}
