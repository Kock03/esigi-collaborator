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
  @Length(4)
  agency: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  digit: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankAccountDigit: string;

  @ApiProperty()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
