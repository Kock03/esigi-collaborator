import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    const financialsWhiteCollaborator = await this.financialsRepository
      .createQueryBuilder('financials')
      .getMany();

    return financialsWhiteCollaborator;
  }

  async findOneOrFail(
    conditions: FindConditions<FinancialsEntity>,
    options?: FindOneOptions<FinancialsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.financialsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateFinancialsDto) {
    const financial = this.financialsRepository.create(data);
    return await this.financialsRepository.save(financial);
  }

  async update(id: string, data: UpdateFinancialsDto) {
    const financial = await this.financialsRepository.findOneOrFail({ id });
    if (!financial) {
      throw new HttpException('Not Found', 404);
    }
    return await this.financialsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.financialsRepository.findOneOrFail({ id });
    return await this.financialsRepository.softDelete({ id });
  }
}
