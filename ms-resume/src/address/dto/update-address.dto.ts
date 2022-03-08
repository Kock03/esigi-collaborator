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
  @MinLength(8)
  @MaxLength(8)
  @IsString()
  cep: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  street: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @MaxLength(10)
  @IsNumber()
  number: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  district: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(60)
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
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
