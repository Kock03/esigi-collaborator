import {
  IsNotEmpty,
  Length,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @Length(8)
  cep: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  street: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  district: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  city: string;

  @IsOptional()
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
