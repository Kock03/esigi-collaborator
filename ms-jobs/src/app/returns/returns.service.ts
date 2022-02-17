import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
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
    const interviews = await this.returnsRepository.find();

    return interviews;
  }

  async findOneOrFail(
    conditions: FindConditions<ReturnsEntity>,
    options?: FindOneOptions<ReturnsEntity>,
  ) {
    try {
      return await this.returnsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.Message);
    }
  }

  async store(data: CreateReturnsDto) {
    const inertview = this.returnsRepository.create(data);
    return await this.returnsRepository.save(data);
  }

  async update(id: string, data: UpdateReturnsDto) {
    const job = await this.returnsRepository.findOneOrFail({ id });
    if (!job) {
      throw new HttpException('Not found', 404);
    }
    return await this.returnsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.returnsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new HttpException('Registro não existe ou invalido', 404);
    }

    return await this.returnsRepository.softDelete({ id });
  }
}
