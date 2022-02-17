import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class UpdateBankDataDto {


  @ApiProperty()
  @IsOptional()
  @IsString()
  agency: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  digit: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accountType: AccountTypes;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accountNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  accountDigit: number;
}
