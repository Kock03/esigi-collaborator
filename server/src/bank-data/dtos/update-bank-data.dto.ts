import { AccountTypes } from './account-types.enum';

export interface UpdateBankDataDto {
  bank: string;
  agency: string;
  accountType: AccountTypes;
  accountNumber: string;
  digit: string;
}
