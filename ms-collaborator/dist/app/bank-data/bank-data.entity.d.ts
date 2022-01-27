import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './dtos/account-types.enum';
export declare class BankDataEntity {
    id: string;
    bank: string;
    agency: string;
    accountType: AccountTypes;
    accountNumber: number;
    digit: number;
    bankAccountDigit: number;
    Collaborator: CollaboratorsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
