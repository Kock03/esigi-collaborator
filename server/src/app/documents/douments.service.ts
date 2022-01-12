import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { DocumentsEntity } from "./documents.entity";
import { CreateDocumentsDto } from "./dtos/create-documents.dto";
import { UpdateDocumentsDto } from "./dtos/update-documents.dto";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsEntity)
    private readonly documentsRepository: Repository<DocumentsEntity>,
  ) {}

  async findAll() {
    const documentsWhiteCollaborator = await this.documentsRepository
    .createQueryBuilder('documents')
    .leftJoinAndSelect('documents.collaborator', 'collaborator')
    .getMany();

    return documentsWhiteCollaborator;
  }

  async findOneOrfail(
    conditions: FindConditions<DocumentsEntity>,
    options?: FindOneOptions<DocumentsEntity>,) {
    try {
      return await this.documentsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateDocumentsDto) {
    const document = this.documentsRepository.create(data);
    return await this.documentsRepository.save(document);
  }

  async update(id: string, data: UpdateDocumentsDto) {
    const document = await this.documentsRepository.findOneOrFail({id});
    this.documentsRepository.merge(document, data);
    return await this.documentsRepository.save(document);
  }

  async destroy(id: string) {
    await this.documentsRepository.findOneOrFail({ id });
    return await this.documentsRepository.softDelete({ id });
  }
}