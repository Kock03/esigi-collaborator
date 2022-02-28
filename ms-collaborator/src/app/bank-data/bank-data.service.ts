import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { BankDataEntity } from './bank-data.entity';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';

@Injectable()
export class BankDataService {
  constructor(
    @InjectRepository(BankDataEntity)
    private readonly bankDataRepository: Repository<BankDataEntity>,
  ) {}

  async findAll() {
    const banksWhiteCollaborator = await this.bankDataRepository
      .createQueryBuilder('bank_data')
      .getMany();

    return banksWhiteCollaborator;
  }

  async findOneOrFail(
    conditions: FindConditions<BankDataEntity>,
    options?: FindOneOptions<BankDataEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.bankDataRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateBankDataDto) {
    const bank = this.bankDataRepository.create(data);
    return await this.bankDataRepository.save(bank);
  }

  async update(id: string, data: UpdateBankDataDto) {
    const bank = await this.bankDataRepository.findOneOrFail({ id });
    if (!bank) {
      throw new NotFoundException();
    }
    return await this.bankDataRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.bankDataRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.bankDataRepository.softDelete({ id });
  }
}
