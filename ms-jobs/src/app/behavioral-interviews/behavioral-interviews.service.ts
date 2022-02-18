import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { BehaviroalInterviewsEntity } from './behavioral-interviews.entity';
import { CreateBehaviorInterviewsDto } from './dtos/create-behavioral-interviews.dto';
import { UpdateBehaviorInterviewsDto } from './dtos/update-behavioral-interviews.dto';

@Injectable()
export class BehavioralInterviewsService {
  constructor(
    @InjectRepository(BehaviroalInterviewsEntity)
    private readonly behavioralInterviewsRepository: Repository<BehaviroalInterviewsEntity>,
  ) {}

  async findAll() {
    const interviews = await this.behavioralInterviewsRepository.find();

    return interviews;
  }

  async findOneOrFail(
    conditions: FindConditions<BehaviroalInterviewsEntity>,
    options?: FindOneOptions<BehaviroalInterviewsEntity>,
  ) {
    try {
      return await this.behavioralInterviewsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.Message);
    }
  }

  async store(data: CreateBehaviorInterviewsDto) {
    const inertview = this.behavioralInterviewsRepository.create(data);
    return await this.behavioralInterviewsRepository.save(inertview);
  }

  async update(id: string, data: UpdateBehaviorInterviewsDto) {
    const inertview = await this.behavioralInterviewsRepository.findOneOrFail({
      id,
    });
    if (!inertview) {
      throw new HttpException('Not found', 404);
    }
    return await this.behavioralInterviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.behavioralInterviewsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new HttpException('Registro não existe ou invalido', 404);
    }

    return await this.behavioralInterviewsRepository.softDelete({ id });
  }
}