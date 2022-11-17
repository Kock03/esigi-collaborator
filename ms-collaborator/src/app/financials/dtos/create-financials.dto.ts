import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {

  @IsNotEmpty()
  contractType: ContractTypes;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  dateInclusion: Date;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
