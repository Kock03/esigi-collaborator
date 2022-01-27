import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CollaboratorsEntity } from './collaborators.entity';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
export declare class CollaboratorsService {
    private readonly collaboratorsRepository;
    constructor(collaboratorsRepository: Repository<CollaboratorsEntity>);
    findAll(): Promise<CollaboratorsEntity[]>;
    findOneOrFail(conditions: FindConditions<CollaboratorsEntity>, options?: FindOneOptions<CollaboratorsEntity>): Promise<CollaboratorsEntity>;
    store(data: CreateCollaboratorsDto): Promise<CollaboratorsEntity>;
    update(id: string, data: CreateCollaboratorsDto): Promise<CollaboratorsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
