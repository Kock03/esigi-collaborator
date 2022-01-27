import { DocumentsService } from "./douments.service";
import { CreateDocumentsDto } from "./dtos/create-documents.dto";
import { UpdateDocumentsDto } from "./dtos/update-documents.dto";
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    index(): Promise<import("./documents.entity").DocumentsEntity[]>;
    show(id: string): Promise<import("./documents.entity").DocumentsEntity>;
    store(body: CreateDocumentsDto): Promise<import("./documents.entity").DocumentsEntity>;
    update(id: string, body: UpdateDocumentsDto): Promise<import("./documents.entity").DocumentsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
