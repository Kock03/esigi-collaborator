import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentValidator } from 'src/validators/document.validator';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DependentsEntity } from './dependents.entity';
import { CreatedependentsDto } from './dtos/create-dependents.dto';
import { UpdateDependentsDto } from './dtos/update-dependents.dto';

@Injectable()
export class DependentsService {
  constructor(
    @InjectRepository(DependentsEntity)
    private readonly dependentsRepository: Repository<DependentsEntity>,
  ) { }

  async findAll() {
    const dependentsWhiteAll = await this.dependentsRepository
      .createQueryBuilder('dependents')
      .getMany();

    return dependentsWhiteAll;
  }

  async findOneOrFail(
    conditions: FindConditions<DependentsEntity>,
    options?: FindOneOptions<DependentsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.dependentsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreatedependentsDto) {
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new HttpException('O CPF é inválido', 404);
      }
      else {
        try {
          const dependent = this.dependentsRepository.create(data);
          return await this.dependentsRepository.save(dependent);
        } catch (error) {
          throw new HttpException('Duplicidade de CPF', 404);
        }
      }
    }
    else {
      throw new HttpException('CPF não podem ser nulos', 404);
    }

  }

  async update(id: string, data: UpdateDependentsDto) {
    const dependent = await this.dependentsRepository.findOneOrFail({ id });
    if (!dependent) {
      throw new HttpException('Not Found', 404);
    }
    return await this.dependentsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    this.dependentsRepository.findOneOrFail({ id });
    return await this.dependentsRepository.softDelete({ id });
  }
}
