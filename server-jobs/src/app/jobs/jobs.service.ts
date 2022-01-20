import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Repository } from "typeorm/repository/Repository";
import { CreateJobsDto } from "./dtos/create-jobs.dto";
import { UpdateJobsDto } from "./dtos/update-jobs.dto";
import { JobsEntity } from "./jobs.entity";

@Injectable()
export class JobsService {

    constructor(
        @InjectRepository(JobsEntity)
<<<<<<< HEAD
        private readonly jobsRepository: Repository<JobsEntity>) { }
=======
        private readonly jobsRepository: Repository<JobsEntity>,) { }
>>>>>>> 08b7d6a92524d6530a06d2676d65f4b84950ff62

    async findAll() {
        const jobsWhiteAll = await this.jobsRepository
            .createQueryBuilder('jobs')
            .getMany();

        return jobsWhiteAll;
    }

    async findOneOrFail(
        conditions: FindConditions<JobsEntity>,
        options?: FindOneOptions<JobsEntity>) {
        options = { relations: ['Languages'] }

        try {
            return await this.jobsRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.Message);
        }
    }

    async store(data: CreateJobsDto) {
        const job = this.jobsRepository.create(data);
        return await this.jobsRepository.save(job);
    }

    async update(id: string, data: UpdateJobsDto) {
        const job = await this.jobsRepository.findOneOrFail({ id });
        this.jobsRepository.merge(job, data);
        return await this.jobsRepository.save(job);
    }

    async destroy(id: string) {
        
        try {
            await this.jobsRepository.findOneOrFail({ id });
        } catch (error) {
            throw new HttpException('Registro não existe ou invalido', 404)
        }

        return await this.jobsRepository.softRemove({ id });
    }
}