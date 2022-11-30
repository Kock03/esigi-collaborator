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

export class CreateBankDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
  accountType: string;

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
