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
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractTypes)
  contractType: ContractTypes;

  @ApiProperty()
  @IsOptional()
  value: number;

  @ApiProperty()
  @IsOptional()
  reason: string;

  @ApiProperty()
  @IsOptional()
  dateInclusion: string;

  @ApiProperty()
  @IsOptional()
  payday: string;

  @ApiProperty()
  @IsOptional()
  monthlyValue: number;

  @IsOptional()
  Collaborator: CollaboratorsEntity;


}
