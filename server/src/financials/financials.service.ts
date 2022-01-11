import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateFinancialsDto } from './dtos/create-financials.dto';
import { UpdateFinancialsDto } from './dtos/update-financials.dto';
import { FinancialsEntity } from './financials.entity';

@Injectable()
export class FinancialsService {
  constructor(
    @InjectRepository(FinancialsEntity)
    private readonly financialsRepository: Repository<FinancialsEntity>,
  ) {}

  async findAll() {
    return await this.financialsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<FinancialsEntity>,
    options?: FindOneOptions<FinancialsEntity>,
  ) {
    try {
      return await this.financialsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(financialsDto: CreateFinancialsDto) {
    const financial = this.financialsRepository.create(financialsDto);
    return await this.financialsRepository.save(financial);
  }

  async update(id: string, financialsDto: UpdateFinancialsDto) {
    const financial = await this.financialsRepository.findOneOrFail(id);
    this.financialsRepository.merge(financial, financialsDto);
    return await this.financialsRepository.save(financial);
  }

  async destroy(id: string) {
    const financial = await this.financialsRepository.findOneOrFail({ id });
    return await this.financialsRepository.softDelete({ id });
  }
}
