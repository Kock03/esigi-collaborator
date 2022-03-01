import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class CreateBankDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  bank: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  agency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  digit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  bankAccountDigit: string;

  @ApiProperty()
  @IsNotEmpty()

  collaborator: CollaboratorsEntity;


}
