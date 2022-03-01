import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  bank: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  agency: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(1)
  @MaxLength(1)
  digit: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(9)
  @MaxLength(9)
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MinLength(4)
  @MaxLength(4)
  bankAccountDigit: string;

  @ApiProperty()
  @IsOptional()
  status: boolean;
}
