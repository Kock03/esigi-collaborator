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
import { BadRequestException } from '../exceptions/bad-request.exception';

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

  async findInactive() {
    const collaboratorsInactiveAll = await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.active =false')
      .getMany();

    return collaboratorsInactiveAll;
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

  // async method(id: string) {
  //   const bankdata = await this.collaboratorsRepository.query(
  //     'select b.created_at from esigi_collaborator.collaborators' +
  //       'inner join esigi_collaborator.bank_data b' +
  //       'on collaborators.bank_data_id = b.id' +
  //       'where collaborators.id = "a01a9a19-4a48-48ad-a34d-a271db43777f"',
  //   );

  //   if (bankdata.created_at.length > 1) {
  //     for (let index = 0; index < bankdata.created_at.length; index++) {
  //       if ([index] < bankdata.created_at.length) bankdata.isActive = false;
  //       bankdata.isActive = true;
  //     }
  //   }
  // }

  async store(data: CreateCollaboratorsDto) {
    /*const activeBanks = data.BankData.filter((bank) => bank.isActive);
    if (activeBanks.length > 1) {
      throw new BadRequestException();
    }*/
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new DocumentsBadRequestExcpetion();
      }
    }
    if (data.cnpj) {
      const invalidCnpj = DocumentValidator.isValidCnpj(data.cnpj);
      if (invalidCnpj) {
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
        throw new ConflictException();
      }
    }

  }

  async update(id: string, data: UpdateCollaboratorsDto) {
    const activeBanks = data.BankData.filter((bank) => bank.status);
    if (activeBanks.length > 1) {
      throw new BadRequestException();
    }

    try {
      const collaborator = await this.collaboratorsRepository.findOneOrFail({
        id,
      });
    } catch {
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
