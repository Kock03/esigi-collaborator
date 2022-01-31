import { IsNotEmpty, Min, Max, Length, IsEmail } from 'class-validator';
import { AddressEntity } from 'src/address/address.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { PhoneEntity } from 'src/phone/phone.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import { MaritalStatus } from './marital-status.enum';
import { GenderTypes } from './gender-types.enum';

export class UpdateResumesDto {
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
  gender: GenderTypes;

  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsNotEmpty()
  address: AddressEntity;

  @IsNotEmpty()
  phone: PhoneEntity;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  site: string;

  linkedin: string;
}
