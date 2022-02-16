import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {
  @ApiProperty()
  @IsNotEmpty()
  contractType: ContractTypes;

  @ApiProperty()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  reason: Reasons;

  @ApiProperty()
  @IsNotEmpty()
  dateInclusion: Date;

  @ApiProperty()
  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
