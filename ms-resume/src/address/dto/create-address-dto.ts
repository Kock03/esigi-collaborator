import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  cep: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @IsNotEmpty()
  @IsString() @IsString()
  @MinLength(3)
  @MaxLength(60)
  district: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  complement: string;
}
