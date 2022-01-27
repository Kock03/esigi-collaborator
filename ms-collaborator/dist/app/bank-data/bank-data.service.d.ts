import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { BankDataEntity } from './bank-data.entity';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';
export declare class BankDataService {
    private readonly bankDataRepository;
    constructor(bankDataRepository: Repository<BankDataEntity>);
    findAll(): Promise<BankDataEntity[]>;
    findOneOrFail(conditions: FindConditions<BankDataEntity>, options?: FindOneOptions<BankDataEntity>): Promise<BankDataEntity>;
    store(data: CreateBankDataDto): Promise<BankDataEntity>;
    update(id: string, data: UpdateBankDataDto): Promise<BankDataEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
