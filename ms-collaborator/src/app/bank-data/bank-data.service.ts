import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
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
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.bankDataRepository.find(options);
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
      ('');
    }
  }

  // async findBankData(id: string){
  //   return await this.bankDataRepository.query('select bank_data.id, bank_data.bank, bank_data.agency, bank_data.account_type, bank_data.digit, bank_data.bank_account_digit, bank_data.status from bank_data where bank_')
  // }

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
