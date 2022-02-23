import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  contractType: ContractTypes;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  reason: Reasons;

  @ApiProperty()
  @IsOptional()
  dateInclusion: Date;
}
