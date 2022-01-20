import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { JobsEntity } from "../jobs/jobs.entity";
import { CreateLanguagesDto } from "./dtos/create-languages.dto";
import { UpdateLanguagesDto } from "./dtos/update-languages.dto";
import { LanguagesEntity } from "./languages.entity";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
    private readonly jobsRepository: Repository<JobsEntity>
  ) { }

  async findAll() {
    const languagesWhiteAll = await this.languagesRepository
      .createQueryBuilder('languages')
      .getMany();

    return languagesWhiteAll;
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
    const language = await this.languagesRepository.findOneOrFail({ id });
    return await this.languagesRepository.softDelete(language);
  }
}