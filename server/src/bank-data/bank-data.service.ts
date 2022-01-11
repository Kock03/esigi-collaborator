import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { BankDataEntity } from './bank-data.entity';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';

@Injectable()
export class BankDataService {
  constructor(
    @InjectRepository(BankDataEntity)
    private readonly bankDataService: Repository<BankDataEntity>,
  ) {}

  async findAll() {
    return await this.bankDataService.find();
  }

  async findOneOrFail(
    conditions: FindConditions<BankDataEntity>,
    options?: FindOneOptions<BankDataEntity>,
  ) {
    try {
      return await this.bankDataService.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(bankDataDto: CreateBankDataDto) {
    const bankData = this.bankDataService.create(bankDataDto);
    return await this.bankDataService.save(bankData);
  }

  async update(id: string, bankDataDto: UpdateBankDataDto) {
    const bankData = await this.bankDataService.findOneOrFail(id);
    this.bankDataService.merge(bankData, bankDataDto);
    return await this.bankDataService.save(bankData);
  }

  async destroy(id: string) {
    const bankData = await this.bankDataService.findOneOrFail({ id });
    return await this.bankDataService.softDelete({ id });
  }
}
