import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateKnowledgesDto } from './dtos/create-knowledges.dto';
import { UpdateKnowledgesDto } from './dtos/update-knowledges.dto';
import { KnowledgesEntity } from './knowledges.entity';

@Injectable()
export class KnowledgesService {
    constructor(
        @InjectRepository(KnowledgesEntity)
        private readonly knowledgesRepository: Repository<KnowledgesEntity>
      ) { }
    
      async findAll() {
        const knowledgesWhiteAll = await this.knowledgesRepository
          .createQueryBuilder('knowledges')
          .getMany();
    
        return knowledgesWhiteAll;
      }
    
      async findOneOrfail(
        conditions: FindConditions<KnowledgesEntity>,
        options?: FindOneOptions<KnowledgesEntity>,) {
        options = { relations: ['Job'] };
        try {
          return await this.knowledgesRepository.findOneOrFail(conditions, options);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }
    
      async store(data: CreateKnowledgesDto) {
        const knowledge = this.knowledgesRepository.create(data);
        return await this.knowledgesRepository.save(knowledge);
      }
    
      async update(id: string, data: UpdateKnowledgesDto) {
        const knowledge = await this.knowledgesRepository.findOneOrFail({ id });
        this.knowledgesRepository.merge(knowledge, data);
        return await this.knowledgesRepository.save(knowledge);
      }
    
      async destroy(id: string) {    
        const knowledge = await this.knowledgesRepository.findOneOrFail({ id });
        return await this.knowledgesRepository.softDelete(knowledge);
      }
}
