import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {
  contractType: ContractTypes;
  value: number;
  dateInclusion: Date;
}
