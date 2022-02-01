import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CreateLanguagesDto } from "./dtos/create-languages.dto";
import { UpdateLanguagesDto } from "./dtos/update-languages.dto";
import { LanguagesEntity } from "./languages.entity";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
  ) { }

  async findAll() {
    const languagesWhiteCollaborator = await this.languagesRepository
      .createQueryBuilder('languages')
      .getMany();

    return languagesWhiteCollaborator;
  }

  async findOneOrfail(
    conditions: FindConditions<LanguagesEntity>,
    options?: FindOneOptions<LanguagesEntity>,) {
    options = { relations: ['Job'] };
    try {
      return await this.languagesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateLanguagesDto) {
    const language = this.languagesRepository.create(data);
    return await this.languagesRepository.save(language);
  }

  async update(id: string, data: UpdateLanguagesDto) {
    const language = await this.languagesRepository.findOneOrFail({ id });
    this.languagesRepository.merge(language, data);
    return await this.languagesRepository.save(language);
  }

  async destroy(id: string) {
    await this.languagesRepository.findOneOrFail({ id });
    return await this.languagesRepository.softDelete({ id });
  }
}