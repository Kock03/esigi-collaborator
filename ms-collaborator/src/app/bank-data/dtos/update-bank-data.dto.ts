import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class UpdateBankDataDto {
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
  @IsNumber()
  @MinLength(1)
  @MaxLength(1)
  digit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @MinLength(9)
  @MaxLength(9)
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @MinLength(4)
  @MaxLength(4)
  bankAccountDigit: string;
}
