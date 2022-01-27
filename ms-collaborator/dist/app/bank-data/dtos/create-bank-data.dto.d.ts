import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';
export declare class CreateBankDataDto {
    bank: string;
    agency: string;
    digit: number;
    accountType: AccountTypes;
    accountNumber: number;
    bankAccountDigit: number;
    collaborator: CollaboratorsEntity;
}
