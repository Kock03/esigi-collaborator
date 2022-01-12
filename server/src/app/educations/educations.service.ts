import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { CreateDocumentsDto } from "../documents/dtos/create-documents.dto";
import { CreateLanguagesDto } from "../languages/dtos/create-languages.dto";
import { UpdateEducationsDto } from "./dtos/update-educations.dto";
import { EducationsEntity } from "./educations.entity";

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(EducationsEntity)
    private readonly educationsRepository: Repository<EducationsEntity>,
  ) {}

  async findAll() {
    const educationsWhiteCollaborator = await this.educationsRepository
    .createQueryBuilder('educations')
    .leftJoinAndSelect('educations.collaborator', 'collaborator')
    .getMany();

    return educationsWhiteCollaborator;
  }

  async findOneOrFail(
    conditions: FindConditions<EducationsEntity>,
    options?: FindOneOptions<EducationsEntity>) {
    try {
      return await this.educationsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateDocumentsDto) {
    const financial = this.educationsRepository.create(data);
    return await this.educationsRepository.save(financial);
  }

  async update(id: string, data: UpdateEducationsDto) {
    const education = await this.educationsRepository.findOneOrFail({id});
    this.educationsRepository.merge(education, data);
    return await this.educationsRepository.save(education);
  }

  async destroy(id: string) {
    await this.educationsRepository.findOneOrFail({ id });
    return await this.educationsRepository.softDelete({ id });
  }
}
