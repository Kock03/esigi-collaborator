import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  contractType: ContractTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  reason: Reasons;

  @ApiProperty()
  @IsNotEmpty()
  dateInclusion: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
