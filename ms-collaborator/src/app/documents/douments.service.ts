import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { DocumentsEntity } from './documents.entity';
import { CreateDocumentsDto } from './dtos/create-documents.dto';
import { UpdateDocumentsDto } from './dtos/update-documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsEntity)
    private readonly documentsRepository: Repository<DocumentsEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.documentsRepository.find(options);
  }

  async findByCollaborator(id: string) {
    return await this.documentsRepository.query(`select * from documents where collaborator_id="${id}"`)
  }

  async findOneOrfail(
    conditions: FindConditions<DocumentsEntity>,
    options?: FindOneOptions<DocumentsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.documentsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateDocumentsDto) {
    const document = this.documentsRepository.create(data);
    return await this.documentsRepository.save(document);
  }

  async update(id: string, data: UpdateDocumentsDto) {
    const document = await this.documentsRepository.findOneOrFail({ id });
    if (!document) {
      throw new NotFoundException();
    }
    return await this.documentsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.documentsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.documentsRepository.softDelete({ id });
  }
}
