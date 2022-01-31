import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateKnowledgesDto } from './dtos/create-knowledges.dto';
import { UpdateKnowledgesDto } from './dtos/update-knowledges.dto';
import { KnowledgesEntity } from './knowledges.entity';
export declare class KnowledgesService {
    private readonly knowledgesRepository;
    constructor(knowledgesRepository: Repository<KnowledgesEntity>);
    findAll(): Promise<KnowledgesEntity[]>;
    findOneOrfail(conditions: FindConditions<KnowledgesEntity>, options?: FindOneOptions<KnowledgesEntity>): Promise<KnowledgesEntity>;
    store(data: CreateKnowledgesDto): Promise<KnowledgesEntity>;
    update(id: string, data: UpdateKnowledgesDto): Promise<KnowledgesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
