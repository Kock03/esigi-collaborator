import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ContractTypes)
  contractType: ContractTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Reasons)
  reason: Reasons;

  @ApiProperty()
  @IsNotEmpty()
  dateInclusion: Date;
}
