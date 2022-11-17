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

export class UpdateBankDataDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
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
  accountType: string;

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
  inactive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
