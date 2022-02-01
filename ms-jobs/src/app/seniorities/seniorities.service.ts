import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateSenioritiesDto } from './dtos/create-seniorities.dto';
import { UpdateSenioritiesDto } from './dtos/update-seniorities.dto';
import { SenioritiesEntity } from './seniorities.entity';

@Injectable()
export class SenioritiesService {
    constructor(
        @InjectRepository(SenioritiesEntity)
        private readonly senioritiesRepository: Repository<SenioritiesEntity>
      ) { }
    
      async findAll() {
        const senioritiesWhiteAll = await this.senioritiesRepository
          .createQueryBuilder('seniorities')
          .getMany();
    
        return senioritiesWhiteAll;
      }
    
      async findOneOrfail(
        conditions: FindConditions<SenioritiesEntity>,
        options?: FindOneOptions<SenioritiesEntity>,) {
        options = { relations: ['Job'] };
        try {
          return await this.senioritiesRepository.findOneOrFail(conditions, options);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }
    
      async store(data: CreateSenioritiesDto) {
        const seniority = this.senioritiesRepository.create(data);
        return await this.senioritiesRepository.save(seniority);
      }
    
      async update(id: string, data: UpdateSenioritiesDto) {
        const seniority = await this.senioritiesRepository.findOneOrFail({ id });
        this.senioritiesRepository.merge(seniority, data);
        return await this.senioritiesRepository.save(seniority);
      }
    
      async destroy(id: string) {    
        const seniority = await this.senioritiesRepository.findOneOrFail({ id });
        return await this.senioritiesRepository.softDelete(seniority);
      }
}
