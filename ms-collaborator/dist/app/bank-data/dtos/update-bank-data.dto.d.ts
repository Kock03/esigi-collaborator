import { AccountTypes } from './account-types.enum';
export declare class UpdateBankDataDto {
    bank: string;
    agency: string;
    digit: number;
    accountType: AccountTypes;
    accountNumber: number;
    AccountDigit: number;
}
