import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/address.entity';
import { DocumentsBadRequestExcpetion } from 'src/exceptions/documents-bad-request.exception';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { PhoneEntity } from 'src/phone/phone.entity';
import { DocumentValidator } from '../validators/document.validator';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
  In,
  Like,
} from 'typeorm';
import { CreateResumesDto } from './dto/create-resumes.dto';
import { UpdateResumesDto } from './dto/update-resumes.dto';
import { ResumesEntity } from './resumes.entity';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import { v4 } from 'uuid';
import { ResumeTemplate } from './resume-template';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumesEntity)
    private readonly resumesRepository: Repository<ResumesEntity>,
  ) { }

  async createPdf(id: string) {
    const data = await this.findOneOrFail({ id });
    console.log(data)
    const creatorPdf = new ResumeTemplate(data);
    const printer = await new PdfPrinter(creatorPdf.Font);
    const options = {};
    var name = data.firstName + data.lastName + data.cpf + '.pdf';
    let file_name = 'pdf/' + name;
    const pdfDoc = await printer.createPdfKitDocument(
      creatorPdf.DocDefinition,
      options,
    );
    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();
    return { file_name: name };
  }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      relations: ['Phone', 'Address'],
    };
    return await this.resumesRepository.find(options);
  }

  async findResumesListById(idList: string[]) {
    return await this.resumesRepository.find({
      select: ['id', 'firstName', 'lastName'],
      where: { id: In(idList) },
    });
  }

  async findOneOrFail(
    conditions: FindConditions<ResumesEntity>,
    options?: FindOneOptions<ResumesEntity>,
  ) {
    options = {
      relations: ['Educations', 'Skills', 'Experiences', 'Languages', 'Phone', 'Address',],
    };
    try {
      return await this.resumesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  findByName(name: string) {
    if (name === '') {
      return this.findAll();
    } else {
      return this.resumesRepository.find({
        select: ['id', 'firstName', 'lastName', 'birthDate'],
        relations: ['Phone', 'Address',],
        where: [{ firstName: Like(`%${name}%`) }],
      });
    }
  }

  async store(data: CreateResumesDto) {
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new DocumentsBadRequestExcpetion();
      }
    }
    if (data.cpf === null) {
      try {
        const resume = this.resumesRepository.create(data);
        return await this.resumesRepository.save(resume);
      } catch (error) {
        throw new HttpException(JSON.stringify(error), 400);
      }
    } else {
      try {
        const resume = this.resumesRepository.create(data);
        return await this.resumesRepository.save(resume);
      } catch (error) {
        throw new HttpException(JSON.stringify(error), 400);
      }
    }
  }

  async update(id: string, data: UpdateResumesDto) {
    try {
      const resume = await this.resumesRepository.findOneOrFail(
        { id },
        { relations: ['Phone', 'Address'] },
      );
      data.Address.id = resume.Address.id;
      data.Phone.id = resume.Phone.id;

    } catch (err) {
      throw new NotFoundException();
    }
    return await this.resumesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.resumesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.resumesRepository.softDelete({ id });
  }
}
