// import { HttpService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { join } from 'path/posix';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
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
    private httpService: HttpService,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      relations: ['jobs'],
      order: { createdAt: 'DESC' },
    };

    return await this.interviewsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<InterviewsEnitiy>,
    options?: FindOneOptions<InterviewsEnitiy>,
  ) {
    try {
      return await this.interviewsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getFollowUpInterviews(id: string, token: string) {
    try {
      const interviews = await this.interviewsRepository.query(
        'select interviews_enitiy.id,interviews_enitiy.name_candidate, b.behavioral_interview_date,t.technical_interview_date, j.collaborator_requester_id, j.status from interviews_enitiy left join behavioral_interviews_entity b on interviews_enitiy.behavioral_interviews_id = b.id left join technical_interviews_entity t on interviews_enitiy.technical_interviews_id = t.id left join jobs_entity j on interviews_enitiy.job_id = j.id where interviews_enitiy.job_id = ' +
        '"' +
        id +
        '"' +
        'and interviews_enitiy.deleted_at is null ',
      );
      const collaboratorIdList = interviews.map((interview) => {
        return interview.collaborator_requester_id;
      });

      const collaborators = await this.httpService
        .post(
          'http://localhost:3501/api/v1/collaborators/list',
          {
            idList: collaboratorIdList,
          },
          {
            headers: {
              authorization: token,
            },
          },
        )
        .toPromise();

      if (collaborators.data) {
        interviews.map((interview) => {
          const collaborator = collaborators.data.find(
            (collaborator) =>
              collaborator.id === interview.collaborator_requester_id,
          );
          interview.collaborator = {
            firstNameCorporateName: collaborator.firstNameCorporateName,
            lastNameFantasyName: collaborator.lastNameFantasyName,
          };
          return interview;
        });
      }

      const resumeIdList = interviews.map((interview) => {
        return interview.name_candidate;
      });

      const resumes = await this.httpService
        .post(
          'http://localhost:3502/api/v1/resumes/list',
          {
            idList: resumeIdList,
          },
          {
            headers: {
              authorization: token,
            },
          },
        )
        .toPromise();

      if (resumes.data) {
        interviews.map((interview) => {
          const resume = resumes.data.find(
            (resume) => resume.id === interview.name_candidate,
          );
          interview.resume = {
            firstName: resume.firstName,
            lastName: resume.lastName,
          };
          return interview;
        });
      }
      return interviews;
    } catch (error) {
      throw new NotFoundException();
    }
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
