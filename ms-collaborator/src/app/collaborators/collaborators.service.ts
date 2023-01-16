import { HttpException, Injectable, UploadedFile } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentValidator } from 'src/app/validators/document.validator';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  In,
  Like,
  Repository,
} from 'typeorm';
import { ConflictException } from '../exceptions/conflict.exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { UpdatePermissionDto } from './dtos/update-permission.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(CollaboratorsEntity)
    private readonly collaboratorsRepository: Repository<CollaboratorsEntity>,
    private httpService: HttpService,
  ) { }

  async findAll(token: string) {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      relations: ['Phone', 'Address',],
    };
    try {
      const collaborators = await this.collaboratorsRepository.find(options);
      return await this.requestResource(collaborators, token);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findCollaboratorsListById(idList: string[]) {
    return await this.collaboratorsRepository.find({
      select: [
        'id',
        'firstNameCorporateName',
        'lastNameFantasyName',
        'office',
        'login',
        'inactive',
      ],
      where: { id: In(idList) },
    });
  }

  async findCollaboratorById(id: string) {
    return await this.collaboratorsRepository.find({
      select: ['id', 'firstNameCorporateName', 'lastNameFantasyName'],
      where: { id: id },
    });
  }

  async shortListCollaborators() {
    return await this.collaboratorsRepository.find({
      select: ['id', 'firstNameCorporateName', 'lastNameFantasyName', 'email'],
      where: { inactive: false },
    });
  }

  async shortListCollaboratorsPermission() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .leftJoinAndSelect('collaborators.Phone', 'Phone')
      .where('collaborators.inactive =false')
      .getMany();
  }

  async findActive() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.inactive =false')
      .getMany();
  }

  async findInactive() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.inactive =true')
      .getMany();
  }

  async findByName(firstNameCorporateName: string, status: number, token: string) {
    let collaborator;
    if (firstNameCorporateName === '') {
      switch (status) {
        case 1:
          collaborator = this.findAll(token);
          return collaborator;
          break;
        case 2:
          collaborator = this.findActive();
          return collaborator;
          break;
        case 3:
          collaborator = this.findInactive();
          return collaborator;
          break;
      }
    } else {
      switch (status) {
        case 1:
          collaborator = await this.collaboratorsRepository.find({
            select: [
              'id',
              'firstNameCorporateName',
              'lastNameFantasyName',
              'email',
              'inactive',
              'admissionDate',
              'office',
              'login',
            ],
            relations: ['Phone'],
            where: [
              {
                firstNameCorporateName: Like(`%${firstNameCorporateName}%`),
              },
            ],
          });

          return await this.requestResource(collaborator, token);

          break;
        case 2:
          collaborator = await this.collaboratorsRepository.find({
            select: [
              'id',
              'firstNameCorporateName',
              'lastNameFantasyName',
              'email',
              'inactive',
              'admissionDate',
              'office',
              'login',
            ],
            relations: ['Phone'],
            where: [
              {
                firstNameCorporateName: Like(`%${firstNameCorporateName}%`),
                inactive: false,
              },
            ],
          });
          return await this.requestResource(collaborator, token);
          break;
        case 3:
          collaborator = await this.collaboratorsRepository.find({
            select: [
              'id',
              'firstNameCorporateName',
              'lastNameFantasyName',
              'email',
              'inactive',
              'admissionDate',
              'office',
              'login',
            ],
            relations: ['Phone'],
            where: [
              {
                firstNameCorporateName: Like(`%${firstNameCorporateName}%`),
                inactive: true,
              },
            ],
          });
          return await this.requestResource(collaborator, token);
          break;
      }
    }
  }

  async findByNameEvaluator(query) {
    if (query.firstNameCorporateName == '') {
      return await this.collaboratorsRepository
        .createQueryBuilder('collaborators')
        .where(
          'collaborators.office = "Gerente" or collaborators.office = "Desenvolvedor" and collaborators.inactive = false',
        )
        .getMany();
    } else {
      return this.collaboratorsRepository.find({
        select: [
          'id',
          'firstNameCorporateName',
          'lastNameFantasyName',
          'office',
        ],
        where: [
          {
            firstNameCorporateName: Like(`%${query.firstNameCorporateName}%`),
            office: 'Gerente',
            inactive: false
          },
          {
            firstNameCorporateName: Like(`%${query.firstNameCorporateName}%`),
            office: 'Desenvolvedor',
            inactive: false

          },
        ],
      });
    }
  }

  async findByNameTechRecruter(query) {
    if (query.firstNameCorporateName == '') {
      return await this.collaboratorsRepository
        .createQueryBuilder('collaborators')
        .where(
          'collaborators.office = "Tech Recruter" and collaborators.office = "RH"',
        )
        .getMany();
    } else {
      return this.collaboratorsRepository.find({
        select: [
          'id',
          'firstNameCorporateName',
          'lastNameFantasyName',
          'office',
        ],
        where: [
          {
            firstNameCorporateName: Like(`%${query.firstNameCorporateName}%`),
            office: 'Tech Recruter',
            inactive: false

          },
          {
            firstNameCorporateName: Like(`%${query.firstNameCorporateName}%`),
            office: 'RH',
            inactive: false

          },
        ],
      });
    }
  }

  async findByNameGerente(query) {
    if (query.firstNameCorporateName == '') {
      return await this.collaboratorsRepository
        .createQueryBuilder('collaborators')
        .where('collaborators.office = "Gerente" and collaborators.inactive = false')
        .getMany();
    } else {
      return this.collaboratorsRepository.find({
        select: [
          'id',
          'firstNameCorporateName',
          'lastNameFantasyName',
          'office',
        ],
        where: [
          {
            firstNameCorporateName: Like(`%${query.firstNameCorporateName}%`),
            office: 'Gerente',
            inactive: false
          },
        ],
      });
    }
  }

  async findGerente() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where('collaborators.office = "Gerente" and collaborators.inactive = false')
      .getMany();
  }

  async findEvaluator() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where(
        'collaborators.office = "Gerente" and collaborators.office = "Desenvolvedor" and collaborators.inactive = false',
      )
      .getMany();
  }

  async findTechRecruter() {
    return await this.collaboratorsRepository
      .createQueryBuilder('collaborators')
      .where(
        'collaborators.office = "Tech Recruter" and collaborators.office = "RH" and collaborators.inactive = false',
      )
      .getMany();
  }

  async findOneOrFail(
    conditions: FindConditions<CollaboratorsEntity>,
    options?: FindOneOptions<CollaboratorsEntity>,
  ) {
    options = {
      relations: [
        'Financials',
        'BankData',
        'Dependents',
        'Documents',
        'Educations',
        'Feedbacks',
        'Languages',
        'Phone',
        'Skills',
        'Address'
      ],
    };
    try {
      return await this.collaboratorsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async store(data: CreateCollaboratorsDto) {
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
        throw new HttpException(JSON.stringify(error), 400);
      }
    }
  }

  async update(id: string, data: UpdateCollaboratorsDto) {
    try {
      const collaborator = await this.collaboratorsRepository.findOneOrFail(
        {
          id,
        },
        { relations: ['Phone', 'Address'] },
      );

      data.Address.id = collaborator.Address.id;
      data.Phone.id = collaborator.Phone.id;

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

  async requestResource(collaborators: any[], token: string) {
    try {
      const collaboratorIdList = collaborators.map((collaborator) => {
        return collaborator.id;
      });

      const resources = await this.httpService
        .post('https://esigi.envolti.com.br:3505/projects/api/v1/resources/list',

          {
            idList: collaboratorIdList,
          }, {
          headers: {
            authorization: token,
          },
        },)
        .toPromise();

      if (resources.data) {
        collaborators.map((collaborator) => {
          const resource = resources.data.find(
            (resource) => resource.collaborator_id === collaborator.id,
          );
          if (resource) {
            collaborator.resource = {
              projectName: resource.name,
            };
          } else {
            collaborator.resource = {
              projectName: 'Indefinido',
            };
            return collaborator;
          }
        });
        return collaborators;
      } else {
        return collaborators;
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
