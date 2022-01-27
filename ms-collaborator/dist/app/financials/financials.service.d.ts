import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateFinancialsDto } from './dtos/create-financials.dto';
import { UpdateFinancialsDto } from './dtos/update-financials.dto';
import { FinancialsEntity } from './financials.entity';
export declare class FinancialsService {
    private readonly financialsRepository;
    constructor(financialsRepository: Repository<FinancialsEntity>);
    findAll(): Promise<FinancialsEntity[]>;
    findOneOrFail(conditions: FindConditions<FinancialsEntity>, options?: FindOneOptions<FinancialsEntity>): Promise<FinancialsEntity>;
    store(data: CreateFinancialsDto): Promise<FinancialsEntity>;
    update(id: string, data: UpdateFinancialsDto): Promise<FinancialsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
