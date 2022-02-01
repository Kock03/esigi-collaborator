import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateSenioritiesDto } from './dtos/create-seniorities.dto';
import { UpdateSenioritiesDto } from './dtos/update-seniorities.dto';
import { SenioritiesEntity } from './seniorities.entity';
export declare class SenioritiesService {
    private readonly senioritiesRepository;
    constructor(senioritiesRepository: Repository<SenioritiesEntity>);
    findAll(): Promise<SenioritiesEntity[]>;
    findOneOrfail(conditions: FindConditions<SenioritiesEntity>, options?: FindOneOptions<SenioritiesEntity>): Promise<SenioritiesEntity>;
    store(data: CreateSenioritiesDto): Promise<SenioritiesEntity>;
    update(id: string, data: UpdateSenioritiesDto): Promise<SenioritiesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
