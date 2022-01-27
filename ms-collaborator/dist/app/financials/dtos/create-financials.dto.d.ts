import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { ContractTypes } from './contract-types.enum';
export declare class CreateFinancialsDto {
    contractType: ContractTypes;
    value: number;
    reason: Reasons;
    dateInclusion: Date;
    collaborator: CollaboratorsEntity;
}
