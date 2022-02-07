import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Repository } from 'typeorm/repository/Repository';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { UpdateJobsDto } from './dtos/update-jobs.dto';
import { JobsEntity } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobsEntity)
    private readonly jobsRepository: Repository<JobsEntity>,
  ) {}

  async findAll() {
    const jobsWhiteAll = await this.jobsRepository.find();


    return jobsWhiteAll;
  }

  async findOneOrFail(
    conditions: FindConditions<JobsEntity>,
    options?: FindOneOptions<JobsEntity>,
  ) {
    options = { relations: ['Knowledges', 'Seniorities', 'Languages'] };

    try {
      return await this.jobsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.Message);
    }
  }

  async store(data: CreateJobsDto) {
    const job = this.jobsRepository.create(data);
    console.log("🚀 ~ file: jobs.service.ts ~ line 39 ~ JobsService ~ store ~ job", job)
    return await this.jobsRepository.save(job);
  }

  async update(id: string, data: UpdateJobsDto) {
    console.log("🚀 ~ file: jobs.service.ts ~ line 43 ~ JobsService ~ update ~ data", data)
    const job = await this.jobsRepository.findOneOrFail({ id });
    if (!job){
       throw new HttpException('Not found', 404)
    }
    return await this.jobsRepository.save({id: id, ...data});
  }

  async destroy(id: string) {
    try {
      await this.jobsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new HttpException('Registro não existe ou invalido', 404);
    }

    return await this.jobsRepository.softRemove({ id });
  }
}
