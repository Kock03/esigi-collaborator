import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsNumber()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  state: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(60)
  @IsOptional()
  @IsString()
  complement: string;
}
