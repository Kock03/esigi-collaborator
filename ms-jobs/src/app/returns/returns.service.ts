import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateReturnsDto } from './dtos/create-returns.dto';
import { UpdateReturnsDto } from './dtos/update-returns.dto';
import { ReturnsEntity } from './returns.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(ReturnsEntity)
    private readonly returnsRepository: Repository<ReturnsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.returnsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<ReturnsEntity>,
    options?: FindOneOptions<ReturnsEntity>,
  ) {
    try {
      return await this.returnsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateReturnsDto) {
    const inertview = this.returnsRepository.create(data);
    return await this.returnsRepository.save(data);
  }

  async update(id: string, data: UpdateReturnsDto) {
    try {
      const job = await this.returnsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.returnsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.returnsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
    return await this.returnsRepository.softDelete({ id });
  }
}
