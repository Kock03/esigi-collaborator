import { IsNotEmpty } from 'class-validator';
import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {

  @IsNotEmpty()
  contractType: ContractTypes;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  reason: Reasons;

  @IsNotEmpty()
  dateInclusion: Date;
}
