import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { ConnectionIsNotSetError } from 'typeorm';
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
  @Length(4)
  agency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  digit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bankAccountDigit: string;

  @ApiProperty()
  @IsOptional()
  inactive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  Collaborator: CollaboratorsEntity;
}
