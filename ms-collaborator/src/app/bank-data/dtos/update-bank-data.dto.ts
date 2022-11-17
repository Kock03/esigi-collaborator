import { IsNotEmpty } from 'class-validator';

export class UpdateBankDataDto {

  @IsNotEmpty()
  bank: string;

  @IsNotEmpty()
  agency: string;

  @IsNotEmpty()
  digit: number;

  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  accountNumber: number;

  @IsNotEmpty()
  AccountDigit: number;

}
