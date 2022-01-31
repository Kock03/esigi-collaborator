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
import { AddressEntity } from 'src/address/address.entity';
import { PhoneEntity } from 'src/phone/phone.entity';
import { MaritalStatus } from './marital-status.enum';
import { GenderTypes } from './gender-types.enum';
import { EducationsEntity } from 'src/educations/educations.entity';
import { LanguagesEntity } from 'src/languages/languages.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { SkillsEntity } from 'src/skills/skills.entity';

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
  Address: AddressEntity;

  @IsNotEmpty()
  Phone: PhoneEntity;
  
  @IsNotEmpty()
  Educations: EducationsEntity[];
  
  @IsNotEmpty()
  Languages: LanguagesEntity[];

  
  @IsNotEmpty()
  Experiences: ExperiencesEntity[];

  @IsNotEmpty()
  Skills: SkillsEntity[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  site: string;

  @IsOptional()
  linkedin: string;
}
