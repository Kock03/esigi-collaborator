import { AccountTypes } from './account-types.enum';

export interface CreateBankDataDto {
  bank: string;
  agency: string;
  accountType: AccountTypes;
  accountNumber: string;
  digit: string;
}
