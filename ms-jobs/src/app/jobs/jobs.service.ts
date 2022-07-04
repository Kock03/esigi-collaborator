import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like } from 'typeorm';
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
    private httpService: HttpService,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    try {
      const jobs = await this.jobsRepository.find(options);

      const collaboratorIdList = jobs.map((job) => {
        return job.collaboratorRequesterId;
      });
      
      // TODO - Substituir futuramente e remover o toPromise()
      const collaborators = await this.httpService
        .post('http://localhost:3501/api/v1/collaborators/list', {
          idList: collaboratorIdList,
        })
        .toPromise();
        console.log(collaborators.data)
        if (collaborators.data) {
          jobs.map((job) => {
            const collaborator = collaborators.data.find(
              (collaborator) => collaborator.id === job.collaboratorRequesterId);
            console.log(collaborator)
            job.collaborator = {
              firstNameCorporateName: collaborator.firstNameCorporateName,
              lastNameFantasyName: collaborator.lastNameFantasyName,
            };
            return job;
          })
        }
        const customerIdList = jobs.map((job) => {
          return job.customerId;
        });

        const customers = await this.httpService
        .post('http://localhost:3506/api/v1/customers/list', {
          idList: customerIdList,
        })
        .toPromise();
        if (customers.data) {
          jobs.map((job) => {
            const customer = customers.data.find(
              (customer) => customer.id === job.customerId);

            job.customer = {
              corporateName: customer.corporateName,
            };
            return job;
          })
        }
        return jobs;
      } catch (error) {
        throw new NotFoundException();
      }
  }

  findByName(query): Promise<JobsEntity[]> {
    return this.jobsRepository.find({
      where: [
        { jobName: Like(`${query.jobName}%`) },]
    });
  }

  async findOneOrFail(
    conditions: FindConditions<JobsEntity>,
    options?: FindOneOptions<JobsEntity>,
  ) {
    options = {
      relations: ['Returns'],
    };
    try {
      const job = await this.jobsRepository.findOneOrFail(
        conditions,
        options,
      );
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
