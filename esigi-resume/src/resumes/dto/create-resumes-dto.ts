import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { MaritalStatus } from './marital-status.enum';
import { GenderTypes } from './gender-types.enum';

export class CreateResumesDto {
  @IsOptional()
  photo: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  lastName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  login: string;

  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  gender: GenderTypes;

  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsNotEmpty()
  address: AddressesEntity;

  @IsNotEmpty()
  phone: PhonesEntity;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  site: string;

  @IsOptional()
  linkedin: string;
}
