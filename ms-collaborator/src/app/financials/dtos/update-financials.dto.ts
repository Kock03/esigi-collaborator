import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ContractTypes } from './contract-types.enum';

export class UpdateFinancialsDto {
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
}
