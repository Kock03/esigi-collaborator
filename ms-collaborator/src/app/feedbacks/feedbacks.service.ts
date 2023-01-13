import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateFeedbacksDto } from './dto/create-feedbacks.dto';
import { UpdateFeedbacksDto } from './dto/update-feedbacks.dto';
import { FeedbacksEntity } from './feedbacks.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbacksEntity)
    private readonly feedbacksRepository: Repository<FeedbacksEntity>,
    private httpService: HttpService,
  ) {}

  async findByCollaborator(id: string, token: string) {
    let feedbacks: any[];
    feedbacks = await this.feedbacksRepository.query(
      `select * from feedbacks where collaborator_id="${id}"`,
    );

    const collaboratorIdList = feedbacks.map((feedback) => {
      return feedback.collaborator_manager_id;
    });

    const collaborators = await this.httpService
      .post(
        'http://https://esigi.envolti.com.br:3501/api/v1/collaborators/list',
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
      feedbacks.map((feedback) => {
        if (feedback.collaborator_manager_id != undefined) {
          const collaborator = collaborators.data.find(
            (collaborator) =>
              collaborator.id === feedback.collaborator_manager_id,
          );
          if (collaborator) {
            feedback.collaborator = {
              firstNameCorporateName: collaborator.firstNameCorporateName,
              lastNameFantasyName: collaborator.lastNameFantasyName,
            };
          } else {
            feedback.collaborator_manager_id = 'indefinido';
          }

          return feedback;
        } else {
          return feedback;
        }
      });
    } else {
      return feedbacks;
    }
    const projectIdList = feedbacks.map((feedback) => {
      return feedback.project_id;
    });

    const projects = await this.httpService
      .post(
        'http://https://esigi.envolti.com.br:3505/api/v1/projects/list',
        {
          idList: projectIdList,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      .toPromise();

    if (projects.data) {
      feedbacks.map((feedback) => {
        if (feedback.project_id != undefined) {
          const project = projects.data.find(
            (project) => project.id === feedback.project_id,
          );
          if (project) {
            feedback.project = {
              name: project.name,
            };
          } else {
            feedback.project_id = 'Indefinido';
          }

          return feedback;
        } else {
          return feedback;
        }
      });
    } else {
      return feedbacks;
    }
    return feedbacks;
  }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    try {
      return await this.feedbacksRepository.find(options);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async findOneOrFail(
    conditions: FindConditions<FeedbacksEntity>,
    options?: FindOneOptions<FeedbacksEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.feedbacksRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateFeedbacksDto) {
    const feedbacks = this.feedbacksRepository.create(data);
    return await this.feedbacksRepository.save(feedbacks);
  }

  async viewFeedbacks(collaboratorId): Promise<FeedbacksEntity[]> {
    return await this.feedbacksRepository.find({
      where: {
        collaborator: collaboratorId,
      },
      relations: ['collaborator'],
    });
  }

  async update(id: string, data: UpdateFeedbacksDto) {
    const feedbacks = await this.feedbacksRepository.findOneOrFail({ id });
    if (!feedbacks) {
      throw new NotFoundException();
    }
    return await this.feedbacksRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.feedbacksRepository.findOne({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.feedbacksRepository.softDelete({ id });
  }
}
