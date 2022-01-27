import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';
export declare class CollaboratorsController {
    private readonly collaboratorsRepository;
    constructor(collaboratorsRepository: CollaboratorsService);
    index(): Promise<import("./collaborators.entity").CollaboratorsEntity[]>;
    store(body: CreateCollaboratorsDto): Promise<import("./collaborators.entity").CollaboratorsEntity>;
    show(id: string): Promise<import("./collaborators.entity").CollaboratorsEntity>;
    update(id: string, body: UpdateCollaboratorsDto): Promise<import("./collaborators.entity").CollaboratorsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
