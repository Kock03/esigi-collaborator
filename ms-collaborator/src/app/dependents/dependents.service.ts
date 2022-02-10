import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DependentsEntity } from './dependents.entity';
import { CreatedependentsDto } from './dtos/create-dependents.dto';
import { UpdateDependentsDto } from './dtos/update-dependents.dto';

@Injectable()
export class DependentsService {
    constructor(
        @InjectRepository(DependentsEntity)
        private readonly DependentsRepository: Repository<DependentsEntity>,
    ) { }

    async findAll() {
        const dependentsWhiteAll = await this.DependentsRepository
            .createQueryBuilder('dependents')
            .getMany();

        return dependentsWhiteAll;
    }

    async findOneOrFail(
        conditions: FindConditions<DependentsEntity>,
        options?: FindOneOptions<DependentsEntity>,) {
        options = { relations: ['Collaborator'] }
        try {
            return await this.DependentsRepository.findOneOrFail(
                conditions,
                options,
            );
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreatedependentsDto) {
        const dependent = this.DependentsRepository.create(data);
        return await this.DependentsRepository.save(dependent);
    }

    async update(id: string, data: UpdateDependentsDto) {
        const dependent = await this.DependentsRepository.findOneOrFail({ id });
        this.DependentsRepository.merge(dependent, data);
        return await this.DependentsRepository.save(dependent);
    }

    async destroy(id: string) {
        this.DependentsRepository.findOneOrFail({ id });
        return await this.DependentsRepository.softDelete({ id });
    }
}
