import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentValidator } from '../validators/document.validator';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { DependentsEntity } from './dependents.entity';
import { CreatedependentsDto } from './dtos/create-dependents.dto';
import { UpdateDependentsDto } from './dtos/update-dependents.dto';
import { NotFoundException } from '../exceptions/not-found-exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';

@Injectable()
export class DependentsService {
  constructor(
    @InjectRepository(DependentsEntity)
    private readonly dependentsRepository: Repository<DependentsEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.dependentsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<DependentsEntity>,
    options?: FindOneOptions<DependentsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.dependentsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }
  async findByCollaborator(id: string) {
    return await this.dependentsRepository.createQueryBuilder('dependents')
      .where(`collaborator_id="${id}"`)
      .getMany();
  }

  async store(data: CreatedependentsDto) {
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new DocumentsBadRequestExcpetion();
      } else {
        try {
          const dependent = this.dependentsRepository.create(data);
          return await this.dependentsRepository.save(dependent);
        } catch (error) {
          throw new ConflictException();
        }
      }
    } else {
      throw new DocumentsBadRequestExcpetion();
    }
  }

  async update(id: string, data: UpdateDependentsDto) {
    const dependent = await this.dependentsRepository.findOneOrFail({ id });
    if (!dependent) {
      throw new NotFoundException();
    }
    return await this.dependentsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    const dependent = this.dependentsRepository.findOneOrFail({ id });
    if (!dependent) {
      throw new NotFoundException();
    }
    return await this.dependentsRepository.softDelete({ id });
  }
}
