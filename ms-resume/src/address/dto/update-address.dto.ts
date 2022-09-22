import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Length,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsString()
  cep: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsString()
  flag: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  street: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsNumber()
  number: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  district: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  state: string;

  @ApiProperty()
  @MinLength(1)
  @IsOptional()
  @IsString()
  complement: string;
}
