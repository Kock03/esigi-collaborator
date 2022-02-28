import { HttpException, Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { ConflictException } from '../exceptions/conflict.exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(CollaboratorsEntity)
    private readonly collaboratorsRepository: Repository<CollaboratorsEntity>,
  ) { }

  async findAll() {
    const collaboratorsWhiteAll = await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .getMany();

    return collaboratorsWhiteAll;
  }

  async findOneOrFail(
    conditions: FindConditions<CollaboratorsEntity>,

    options?: FindOneOptions<CollaboratorsEntity>,
  ) {
    //options = { relations: ['Feedbacks'] }
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
    if (data.cnpj != null) {
      const validCnpj = DocumentValidator.isValidCnpj(data.cnpj);
      if (!validCnpj) {
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
        console.error(error);
      }
    }
  }

  async update(id: string, data: UpdateCollaboratorsDto) {
    const collaborator = await this.collaboratorsRepository.findOneOrFail({
      id,
    });
    if (!collaborator) {
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
