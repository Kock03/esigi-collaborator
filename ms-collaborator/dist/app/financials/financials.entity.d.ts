import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { ContractTypes } from './dtos/contract-types.enum';
export declare class FinancialsEntity {
    id: string;
    contractType: ContractTypes;
    value: number;
    reason: Reasons;
    Collaborator: CollaboratorsEntity;
    dateInclusion: Date;
    updatedAt: Date;
    deletedAt: Date;
}
