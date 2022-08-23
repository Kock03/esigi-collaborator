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

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumesEntity)
    private readonly resumesRepository: Repository<ResumesEntity>,
  ) { }

  async createPdf(id: string) {
    var educationList = []
    var languageList = []
    var skillList = []

    let obj = {
      gender: '',
      maritalStatus: ''
    }

    const data = await this.findOneOrFail({ id });
    if (data) {
      switch (data.gender && data.maritalStatus) {
        case 1:
          obj.gender = 'Masculino', obj.maritalStatus = 'Solteiro(a)';
        case 2:
          obj.gender = "Feminino", obj.maritalStatus = 'Casado(a)';
        case 3:
          obj.gender = "Indefinido", obj.maritalStatus = 'Separado(a)';
        case 4:
          obj.maritalStatus = 'Divorciado(a)';
        case 5:
          obj.maritalStatus = 'Viuvo(a)';
      }
    }


    Object.keys(data.Educations).forEach(key => {
      switch (data.Educations[key]
        .schooling && data.Educations[key]
        .situation) {
        case 1:
          return data.Educations[key]
            .schooling = 'Ensino Fundaental', data.Educations[key]
              .situation = 'Parada';
        case 2:
          return data.Educations[key]
            .schooling = 'Ensino Médio', data.Educations[key]
              .situation = 'Completa';
        case 3:
          return data.Educations[key]
            .schooling = 'Ensino Superior', data.Educations[key]
              .situation = 'Em Progresso';
      }
    })
    Object.keys(data.Languages).forEach(key => {
      data.Languages[key]
      switch (data.Languages[key].degreeOfInfluence) {
        case 1:
          return data.Languages[key].degreeOfInfluence = 'Leitura, Escrita e Conversação';
        case 2:
          return data.Languages[key].degreeOfInfluence = 'Escrita';
        case 3:
          return data.Languages[key].degreeOfInfluence = 'Leitura';
        case 4:
          return data.Languages[key].degreeOfInfluence = 'Conversação';
        case 5:
          return data.Languages[key].degreeOfInfluence = 'Escrita e Leitura';
        case 6:
          return data.Languages[key].degreeOfInfluence = 'Escrita e Conversação';
      }
    })
    Object.keys(data.Skills).forEach(key => {
      data.Skills[key]
      switch (data.Skills[key]
        .typeOfPeriod && data.Skills[key]
        .seniority) {
        case 1:
          return data.Skills[key]
            .typeOfPeriod = 'Mês(s)', data.Skills[key]
              .seniority = 'Júnior';
        case 2:
          return data.Skills[key]
            .typeOfPeriod = 'Ano(s)', data.Skills[key]
              .seniority = 'Full Stack';
        case 3:
          return data.Skills[key]
            .seniority = 'Sênior';
      }
      if (data.Skills[key]
        .currentPosition === 1) {
        data.Skills[key]
          .currentPosition = 'Posição Atual'
      } else {
        data.Skills[key]
          .currentPosition = 'Posição Antiga'
      }
    })

    data.Educations.forEach(function (education) {
      console.log(education.situation)
      educationList.push({ text: `Escolaridade: ${education.schooling}`, margin: [0, 6, 4, 0], fontSize: 12, });
      educationList.push({ text: `Instituição: ${education.institution}`, margin: [0, 6, 4, 0], fontSize: 12, });
      educationList.push({ text: `Curso: ${education.course}`, margin: [0, 6, 4, 0], fontSize: 12, });
      educationList.push({ text: `Situação:  ${education.situation}`, margin: [0, 6, 4, 0], fontSize: 12, });
    })

    data.Languages.forEach(function (language) {
      languageList.push({ text: `Nome: ${language.languageName}`, margin: [0, 6, 4, 0], fontSize: 12, });
      languageList.push({ text: `Grau: ${language.degreeOfInfluence}`, margin: [0, 6, 4, 0], fontSize: 12, });
    })

    data.Skills.forEach(function (skill) {
      skillList.push({ text: `Tecnologia: ${skill.technology}`, margin: [0, 6, 4, 0], fontSize: 12, });
      skillList.push({ text: `Tempo de Experiência: ${skill.yearsExperience}`, margin: [0, 6, 4, 0], fontSize: 12, });
      skillList.push({ text: `Período: ${skill.typeOfPeriod}`, margin: [0, 6, 4, 0], fontSize: 12, });
      skillList.push({ text: `senioridade:  ${skill.seniority}`, margin: [0, 6, 4, 0], fontSize: 12, });
      skillList.push({ text: `Posição:  ${skill.currentPosition}`, margin: [0, 6, 4, 0], fontSize: 12, });
    })

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {

      background: function () {
        return {
          canvas: [
            {
              type: 'rect',
              x: 0, y: 0, w: 200, h: 841,
              color: '#00BFFF',
            }
          ]
        }
      },

      content: [
        {
          margin: [0, 0, 0, 0],
          columns: [
            {
              stack: [
                { text: 'Dados', fontSize: 14, margin: 0, flex: true },
                { text: 'CPF: ' + data.cpf, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Data de Aniversário: ' + data.birthDate, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Gênero: ' + obj.gender, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Estado civil: ' + obj.maritalStatus, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Contato', fontSize: 14, margin: [0, 10, 4, 0], },
                { text: 'Email: ' + data.email, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Telefone: ' + `(${data.Phone.ddd}) +${data.Phone.ddi} ${data.Phone.phoneNumber}`, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'LinkedIn: ' + ` ${data.linkedin}`, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Endereço', fontSize: 14, margin: [0, 10, 4, 0], },
                { text: 'CEP: ' + data.Address.cep, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Estado: ' + data.Address.state, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Cidade: ' + data.Address.city, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Bairro: ' + data.Address.district, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Rua: ' + data.Address.street, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Número: ' + data.Address.number, margin: [0, 6, 4, 0], fontSize: 10 },
                { text: 'Complemento: ' + data.Address.complement, margin: [0, 6, 4, 0], fontSize: 10 },
              ], width: '35%',
            },
            {
              stack: [
                [
                  { text: data.firstName + ' ' + data.lastName, fontSize: 25, color: 'purple', margin: [0, 0, 20, 0] },
                  { text: 'Escolaridade', fontSize: 17, margin: [0, 15, 6, 0], },
                  [educationList],
                  { text: 'Idiomas', fontSize: 17, margin: [0, 15, 6, 0], },
                  [languageList],
                  { text: 'Tecnologias', fontSize: 17, margin: [0, 15, 6, 0], },
                  [skillList]
                ],
              ],
            }
          ],

        }

      ],

      defaultStyle: {
        font: 'Helvetica'
      }
    };

    const options = {
    }
    let file_name = 'pdf/PDF' + v4() + '.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();
    return { 'file_name': file_name };
  }
  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.resumesRepository.find(options);
  }

  async findResumesListById(idList: string[]) {
    return await this.resumesRepository.find({
      select: ['id', 'firstName', 'lastName'],
      where: { id: In(idList) }
    })
  }

  async findOneOrFail(
    conditions: FindConditions<ResumesEntity>,
    options?: FindOneOptions<ResumesEntity>,
  ) {
    options = { relations: ['Educations', 'Skills', 'Experiences', 'Languages'] };
    try {
      return await this.resumesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }


  findByName(name: string) {
    return this.resumesRepository.find({
      select: ['id', 'firstName', 'lastName'],
      where: [
        { firstName: Like(`%${name}%`) }]
    });
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
      const resume = await this.resumesRepository.findOneOrFail({ id });
    } catch {
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
