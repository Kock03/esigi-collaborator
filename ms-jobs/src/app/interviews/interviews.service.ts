import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { BehavioralInterviewsEntity } from '../behavioral-interviews/behavioral-interviews.entity';
import { NotFoundException } from '../exceptions/not-found-exception';
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';
import { CreateInterviewsDto } from './dtos/create-interviews.dto';
import { UpdateInterviewsDto } from './dtos/update-interviews.dto';
import { InterviewsEnitiy } from './interviews.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(InterviewsEnitiy)
    private readonly interviewsRepository: Repository<InterviewsEnitiy>,
  ) {}

  async findAll() {
    return await this.interviewsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<InterviewsEnitiy>,
    options?: FindOneOptions<InterviewsEnitiy>,
  ) {
    try {
      return await this.interviewsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  // async findInterviewsDetails(
  //   conditions: FindConditions<InterviewsEnitiy>,
  //   options?: FindOneOptions<InterviewsEnitiy>,
  // ) {
  //   options = {
  //     relations: ['behavioralInterviews', 'technicalInterviews', 'jobs'],
  //   };

  //   try {
  //     const interviewFound = await this.interviewsRepository.findOneOrFail(
  //       conditions,
  //       options,
  //     );
  //     const interviewData = {
  //       name: {
  //         candiadte: interviewFound.behavioralInterviews.nameCandidate,
  //       },
  //       behavioral: {
  //         behavioralInterviewDate:
  //           interviewFound.behavioralInterviews.behavioralInterviewDate,
  //       },
  //       technical: {
  //         technicalInterviewDate:
  //           interviewFound.technicalInterviews.technicalInterviewDate,
  //       },
  //       job: {
  //         requester: interviewFound.jobs.requester,
  //         status: interviewFound.jobs.status,
  //       },
  //     };

  //     return interviewData;
  //     return interviewFound;
  //   } catch (error) {
  //     console.log(error);
  //     throw new NotFoundException();
  //   }
  // }

  async getFollowUpInterviews(id: string) {
    return await this.interviewsRepository.query(
      'select b.name_candidate, b.behavioral_interview_date, t.technical_interview_date, j.requester, j.status from interviews inner join behavioral_interviews b on interviews.behavioral_interviews_id = b.id inner join technical_interviews t on interviews.technical_interviews_id = t.id inner join jobs j on interviews.jobs_id = j.id where interviews.jobs_id = ' +
        '"' +
        id +
        '"',
    );
  }

  

  async store(data: CreateInterviewsDto) {
    const interview = this.interviewsRepository.create(data);
    return await this.interviewsRepository.save(interview);
  }

  async update(id: string, data: UpdateInterviewsDto) {
    try {
      const interview = await this.interviewsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.interviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.interviewsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.interviewsRepository.softDelete({ id });
  }
}
