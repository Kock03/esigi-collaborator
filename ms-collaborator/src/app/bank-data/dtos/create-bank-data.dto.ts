import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class CreateBankDataDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bank: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  digit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bankAccountDigit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
