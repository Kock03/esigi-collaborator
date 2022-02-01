import { IsNotEmpty } from 'class-validator';
import { AccountTypes } from './account-types.enum';

export class UpdateBankDataDto {

  @IsNotEmpty()
  bank: string;
  
  @IsNotEmpty()
  agency: string;

 @IsNotEmpty()
  digit: number;

  @IsNotEmpty()
  accountType: AccountTypes;

  @IsNotEmpty()
  accountNumber: number;

  @IsNotEmpty()
  AccountDigit: number;
 
}
