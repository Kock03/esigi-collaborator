import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { DocumentsEntity } from "./documents.entity";
import { CreateDocumentsDto } from "./dtos/create-documents.dto";
import { UpdateDocumentsDto } from "./dtos/update-documents.dto";
export declare class DocumentsService {
    private readonly documentsRepository;
    constructor(documentsRepository: Repository<DocumentsEntity>);
    findAll(): Promise<DocumentsEntity[]>;
    findOneOrfail(conditions: FindConditions<DocumentsEntity>, options?: FindOneOptions<DocumentsEntity>): Promise<DocumentsEntity>;
    store(data: CreateDocumentsDto): Promise<DocumentsEntity>;
    update(id: string, data: UpdateDocumentsDto): Promise<DocumentsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
