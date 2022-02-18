import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class UpdateBankDataDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  bank: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(4)
  agency: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Length(1)
  digit: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AccountTypes)
  accountType: AccountTypes;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Length(9)
  accountNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Length(4)
  bankAccountDigit: number;

}
