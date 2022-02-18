import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Reasons } from './contract-reasons.enum';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractTypes)
  contractType: ContractTypes;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(2)
  @MaxLength(300)
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Reasons)
  reason: Reasons;

  @ApiProperty()
  @IsOptional()
  dateInclusion: Date;
}
