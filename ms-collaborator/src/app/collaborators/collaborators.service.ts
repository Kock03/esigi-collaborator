import { HttpException, Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentValidator } from 'src/app/validators/document.validator';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  In,
  Like,
  Repository,
} from 'typeorm';
import { ConflictException } from '../exceptions/conflict.exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(CollaboratorsEntity)
    private readonly collaboratorsRepository: Repository<CollaboratorsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.collaboratorsRepository.find(options);
  }

  async findCollaboratorsListById(idList: string[]) {
    return await this.collaboratorsRepository.find({
      select: ['id', 'firstNameCorporateName', 'lastNameFantasyName'],
      where: { id: In(idList) }
    })
  }

  async shortListCollaborators(){
    return await this.collaboratorsRepository.find({
      select: ['id', 'firstNameCorporateName', 'lastNameFantasyName'],
      where: { active: true },
    });
  }

  async findInactive() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.active =false') 
      .getMany();
  }

  async findActive() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.active =true')
      .getMany();
  }

  findByName(query): Promise<CollaboratorsEntity[]> {
    return this.collaboratorsRepository.find({
      select:[ 'id','firstNameCorporateName', 'lastNameFantasyName'],
      where: [
        { firstNameCorporateName: Like(`${query.firstNameCorporateName}%`) },]
    });
  }

  async findOneOrFail(
    conditions: FindConditions<CollaboratorsEntity>,

    options?: FindOneOptions<CollaboratorsEntity>,
  ) {
    options = { relations: ['Financials', 'Address', 'BankData', 'Dependents', 'Documents', 'Educations','Feedbacks','Languages', 'Phone', 'Skills'] };
    try {
     
      return await this.collaboratorsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async store(data: CreateCollaboratorsDto) {
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new DocumentsBadRequestExcpetion();
      }
    }
    if (data.cnpj) {
      const invalidCnpj = DocumentValidator.isValidCnpj(data.cnpj);
      if (invalidCnpj) {
        throw new DocumentsBadRequestExcpetion();
      }
    }

    if (data.cpf === null && data.cnpj === null) {
      throw new DocumentsBadRequestExcpetion();
    } else {
      try {
        const collaborator = this.collaboratorsRepository.create(data);
        return await this.collaboratorsRepository.save(collaborator);
      } catch (error) {
        throw new HttpException(JSON.stringify(error), 400);
      }
    }
  }

  async update(id: string, data: UpdateCollaboratorsDto) {
    try {
      const collaborator = await this.collaboratorsRepository.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }

    return await this.collaboratorsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.collaboratorsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.collaboratorsRepository.softDelete({ id });
  }
}
