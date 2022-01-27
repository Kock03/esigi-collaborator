import { CreateFinancialsDto } from './dtos/create-financials.dto';
import { UpdateFinancialsDto } from './dtos/update-financials.dto';
import { FinancialsService } from './financials.service';
export declare class FinancialsController {
    private readonly financialsService;
    constructor(financialsService: FinancialsService);
    index(): Promise<import("./financials.entity").FinancialsEntity[]>;
    show(id: string): Promise<import("./financials.entity").FinancialsEntity>;
    store(body: CreateFinancialsDto): Promise<import("./financials.entity").FinancialsEntity>;
    update(id: string, body: UpdateFinancialsDto): Promise<import("./financials.entity").FinancialsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
