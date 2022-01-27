import { BankDataService } from './bank-data.service';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';
export declare class BankDataController {
    private readonly bankDataService;
    constructor(bankDataService: BankDataService);
    index(): Promise<import("./bank-data.entity").BankDataEntity[]>;
    show(id: string): Promise<import("./bank-data.entity").BankDataEntity>;
    store(body: CreateBankDataDto): Promise<import("./bank-data.entity").BankDataEntity>;
    update(id: string, body: UpdateBankDataDto): Promise<import("./bank-data.entity").BankDataEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
