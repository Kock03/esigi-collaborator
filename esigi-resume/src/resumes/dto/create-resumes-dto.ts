import { IsEmail, IsNotEmpty, IsUrl, Length, Max, Min } from 'class-validator';
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { MaritalStatus } from './marital-status.enum';
import { SexTypes } from './sex-types.enum';

export class CreateResumesDto {
  photo: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  firstName: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  lastName: string;

  @IsNotEmpty()
  @Min(3)
  @Max(70)
  login: string;

  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  sex: SexTypes;

  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsNotEmpty()
  addresses: AddressesEntity;

  @IsNotEmpty()
  phones: PhonesEntity;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  site: string;

  @IsNotEmpty()
  linkedin: string;
}
