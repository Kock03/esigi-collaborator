import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateBankDataDto {

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
  bankAccountDigit: number;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;


}
