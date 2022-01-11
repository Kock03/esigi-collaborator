import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(CollaboratorsEntity)
    private readonly collaboratorsRepository: Repository<CollaboratorsEntity>,
  ) {}

  async findAll() {
    return await this.collaboratorsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<CollaboratorsEntity>,
    options?: FindOneOptions<CollaboratorsEntity>,
  ) {
    try {
      return await this.collaboratorsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(collaboratorsDto: CreateCollaboratorsDto) {
    const collaborator = this.collaboratorsRepository.create(collaboratorsDto);
    return await this.collaboratorsRepository.save(collaborator);
  }

  async update(id: string, collaboratorsDto: CreateCollaboratorsDto) {
    const collaborator = await this.collaboratorsRepository.findOneOrFail(id);
    this.collaboratorsRepository.merge(collaborator, collaboratorsDto);
    return await this.collaboratorsRepository.save(collaborator);
  }

  async destroy(id: string) {
    const collaborator = await this.collaboratorsRepository.findOneOrFail({
      id,
    });
    return await this.collaboratorsRepository.softDelete({ id });
  }
}
