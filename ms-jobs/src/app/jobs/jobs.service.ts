import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../exceptions/not-found-exception';
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
    options = {
      relations: ['Returns'],
    };

    try {
      return await this.jobsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // async findInterviewsList(
  //   conditions: FindConditions<JobsEntity>,
  //   options?: FindOneOptions<JobsEntity>,
  // ) {
  //   options = {
  //     relations: ['interviews'],
  //   };

  //   const job = await this.jobsRepository.findOneOrFail(conditions, options);

  //   try {
  //     const job = await this.jobsRepository.findOneOrFail(conditions, options);
  //     const interviewsQuantity = job.interviews.length;
  //     const interviews = new Array();

  //     let quantity = 0;

  //     quantity = interviewsQuantity;
  //     for (let index = 0; index < quantity; index++) {
  //       const interview = {
  //         name: {
  //           candidate:
  //             job.interviews[index]?.behaviroalInterviews.nameCandidate,
  //         },
  //         behavioral: {
  //           behavioralInterviewDate:
  //             job.interviews[index]?.behaviroalInterviews
  //               .behavioralInterviewDate,
  //         },
  //         technical: {
  //           technicalInterviewDate:
  //             job.interviews[index]?.technicalInterviews.technicalInterviewDate,
  //         },
  //       };
  //       interviews.push(interview);
  //     }

  //     const jobInterviews = {
  //       requester: job.requester,
  //       status: job.status,
  //       interviews,
  //     };
  //     return jobInterviews;
  //   } catch (error) {
  //     console.log(error);
  //     throw new NotFoundException();
  //   }
  // }

  async store(data: CreateJobsDto) {
    const job = this.jobsRepository.create(data);
    return await this.jobsRepository.save(job);
  }

  async update(id: string, data: UpdateJobsDto) {
    try {
      const job = await this.jobsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.jobsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.jobsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
    return await this.jobsRepository.softDelete({ id });
  }
}
