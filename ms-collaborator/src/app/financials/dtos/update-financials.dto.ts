import { IsNotEmpty } from 'class-validator';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {

  @IsNotEmpty()
  contractType: ContractTypes;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  dateInclusion: Date;
}
