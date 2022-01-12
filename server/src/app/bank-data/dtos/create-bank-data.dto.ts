import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class CreateBankDataDto {
 
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

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;


}
