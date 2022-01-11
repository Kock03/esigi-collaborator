import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  contractType: ContractTypes;
  value: number;
  dateInclusion: Date;
}
