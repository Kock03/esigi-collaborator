import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';

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
<<<<<<< HEAD
    options?: FindOneOptions<CollaboratorsEntity>,) {
    options = { relations: ['BankData', 'Educations', 'Languages', 'Documents', 'Skills', 'Phone', 'Address', 'Financials', 'Dependents', 'Feedbacks'] }
=======
    options?: FindOneOptions<CollaboratorsEntity>,
  ) {
    options = {
      relations: [
        'BankData',
        'Educations',
        'Languages',
        'Documents',
        'Skills',
        'Phone',
        'Address',
        'Financials',
      ],
    };
>>>>>>> origin/feature/113-criação-tab-candidatura
    try {
      return await this.collaboratorsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateCollaboratorsDto) {
    const collaborator = this.collaboratorsRepository.create(data);
    return await this.collaboratorsRepository.save(collaborator);
  }

  async update(id: string, data: UpdateCollaboratorsDto) {
<<<<<<< HEAD
    const collaborator = await this.collaboratorsRepository.findOneOrFail({ id });
    this.collaboratorsRepository.merge(collaborator, data);
    return await this.collaboratorsRepository.save(collaborator);
=======
    const collaborator = await this.collaboratorsRepository.findOneOrFail({
      id,
    });
    if (!collaborator) {
      throw new HttpException('Not found', 404);
    }
    return await this.collaboratorsRepository.save({ id: id, ...data });
>>>>>>> origin/feature/113-criação-tab-candidatura
  }

  async destroy(id: string) {
    try {
      this.collaboratorsRepository.findOneOrFail({ id });
    } catch (error) {
      throw new HttpException('Registro não existe ou invalido', 404);
    }
    return await this.collaboratorsRepository.softDelete({ id });
  }
}
