import { ContractTypes } from './contract-types.enum';
export declare class UpdateFinancialsDto {
    contractType: ContractTypes;
    value: number;
    reason: Reasons;
    dateInclusion: Date;
}
