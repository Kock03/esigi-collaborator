import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class CreateBankDataDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  bank: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4)
  agency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(1)
  digit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(9)
  accountNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(4)
  bankAccountDigit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
