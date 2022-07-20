import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class CreateFinancialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ContractTypes)
  contractType: ContractTypes;

  @ApiProperty()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reasons)
  reason: Reasons;

  @ApiProperty()
  @IsNotEmpty()
  dateInclusion: string;

  @ApiProperty()
  @IsNotEmpty()
  payday: string;

  @ApiProperty()
  @IsOptional()
  monthlyValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;

}

