import { CreateKnowledgesDto } from './dtos/create-knowledges.dto';
import { UpdateKnowledgesDto } from './dtos/update-knowledges.dto';
import { KnowledgesService } from './knowledges.service';
export declare class KnowledgesController {
    private readonly KnowledgesService;
    constructor(KnowledgesService: KnowledgesService);
    index(): Promise<import("./knowledges.entity").KnowledgesEntity[]>;
    show(id: string): Promise<import("./knowledges.entity").KnowledgesEntity>;
    store(body: CreateKnowledgesDto): Promise<import("./knowledges.entity").KnowledgesEntity>;
    update(id: string, body: UpdateKnowledgesDto): Promise<import("./knowledges.entity").KnowledgesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
