import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindCondition,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateTechnicalInterviewsDto } from './dtos/create-technical-interviews.dto';
import { UpdateTechnicalInterviewsDto } from './dtos/update-technical-interviews.dto';
import { TechnicalInterviewsEntity } from './technical-interviews.entity';

@Injectable()
export class TechnicalInterviewsService {
  constructor(
    @InjectRepository(TechnicalInterviewsEntity)
    private readonly technicalInterviewsRepository: Repository<TechnicalInterviewsEntity>,
  ) {}

  async findAll() {
    return await this.technicalInterviewsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<TechnicalInterviewsEntity>,
    options?: FindOneOptions<TechnicalInterviewsEntity>,
  ) {
    try {
      return await this.technicalInterviewsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new HttpException('Registro não encontrado', 404);
    }
  }

  async store(data: CreateTechnicalInterviewsDto) {
    const interview = await this.technicalInterviewsRepository.create(data);
    await this.technicalInterviewsRepository.save(interview);
  }

  async update(id: string, data: UpdateTechnicalInterviewsDto) {
    const interview = await this.technicalInterviewsRepository.findOneOrFail({
      id,
    });
    if (!interview) {
      throw new HttpException('Registro não encontrado ou inválido', 404);
    }
    return await this.technicalInterviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      const interview = await this.technicalInterviewsRepository.findOneOrFail({
        id,
      });
    } catch (error) {
      throw new HttpException('Registro não encontrado', 404);
    }
    return await this.technicalInterviewsRepository.softRemove({ id });
  }
}
