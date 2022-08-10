import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateFinancialsDto } from './dtos/create-financials.dto';
import { UpdateFinancialsDto } from './dtos/update-financials.dto';
import { FinancialsEntity } from './financials.entity';

@Injectable()
export class FinancialsService {
  constructor(
    @InjectRepository(FinancialsEntity)
    private readonly financialsRepository: Repository<FinancialsEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.financialsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<FinancialsEntity>,
    options?: FindOneOptions<FinancialsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.financialsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async findByCollaborator(id: string) {
    return await this.financialsRepository.query(`select * from financials_entity where collaborator_id="${id}"`)
  }

  async store(data: CreateFinancialsDto) {
    data.monthlyValue = data.value * 170;
    const financial = this.financialsRepository.create(data);
    return await this.financialsRepository.save(financial);
  }

  async update(id: string, data: UpdateFinancialsDto) {
    const financial = await this.financialsRepository.findOneOrFail({ id });
    if (!financial) {
      throw new NotFoundException();
    }
    data.monthlyValue = financial.value * 170;
    return await this.financialsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.financialsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.financialsRepository.softDelete({ id });
  }
}
