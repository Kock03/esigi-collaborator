import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBehaviorInterviewsDto } from 'src/app/behavioral-interviews/dtos/create-behavioral-interviews.dto';
import {
  FindCondition,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { ClientInterviewsEntity } from './client-interviews.entity';
import { CreateClientInterviewsDto } from './dtos/create-client-interviews.dto';
import { UpdateClientInterviewsDto } from './dtos/update-client-interviews.dto';

@Injectable()
export class ClientInterviewsService {
  constructor(
    @InjectRepository(ClientInterviewsEntity)
    private readonly clientInterviewsRepository: Repository<ClientInterviewsEntity>,
  ) { }

  async findAll() {
    return await this.clientInterviewsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<ClientInterviewsEntity>,
    options?: FindOneOptions<ClientInterviewsEntity>,
  ) {
    try {
      return await this.clientInterviewsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateClientInterviewsDto) {
    const interview = await this.clientInterviewsRepository.create(data);
    return await this.clientInterviewsRepository.save(interview);
  }

  async update(id: string, data: UpdateClientInterviewsDto) {
    const interview = await this.clientInterviewsRepository.findOneOrFail({
      id,
    });
    if (!interview) {
      throw new HttpException('Registro não existe ou é inválido', 404);
    }
    return await this.clientInterviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.clientInterviewsRepository.findOneOrFail({
        id,
      });
    } catch (error) {
      throw new HttpException('Registro não existe ou inválido', 404);
    }
    return await this.clientInterviewsRepository.softRemove({ id });
  }
}
