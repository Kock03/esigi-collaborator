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
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.bankDataRepository.find(options);
  }

  async findByCollaborator(id: string) {
    return await this.bankDataRepository.query(`select * from bank_data where collaborator_id="${id}"`)
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

  async store(data: CreateBankDataDto) {

    try {
      if (data.inactive === false) {
        const list = await this.findAll();
        Object.keys(list).forEach(key => {
          list[key].inactive = 0
          this.update(list[key].id, list[key]);
        })
      }
      const bank = this.bankDataRepository.create(data);

      return await this.bankDataRepository.save(bank);

    } catch (e) {
      console.error(e);
    }

  }

  async update(id: string, data: UpdateBankDataDto) {
    try{
      const bank = await this.bankDataRepository.findOneOrFail({ id });
      if (!bank) {
        throw new NotFoundException();
      }
      if(data.inactive === false){
        const list = await this.findAll();
        Object.keys(list).forEach(key => {
          if(list[key].id === id){
            list[key].inactive = 1
            return this.bankDataRepository.save({ id: id, ...data });
          }else{
            list[key].inactive = 0
            this.update(list[key].id, list[key]);
          }
        })
      } else{
        return await this.bankDataRepository.save({ id: id, ...data });
      }
      console.log(data)
    }catch (e){
      console.log(e);
    }

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
