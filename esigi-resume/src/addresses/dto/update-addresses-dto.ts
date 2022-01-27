import {
  IsNotEmpty,
  Length,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAddressesDto {
  @IsNotEmpty()
  @Length(8)
  cep: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  street: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  neighborhood: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  city: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  state: string;

  @MinLength(3)
  @MaxLength(60)
  complement: string;
}
