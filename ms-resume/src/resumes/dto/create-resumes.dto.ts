import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
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
import { ApiProperty } from '@nestjs/swagger';

export class CreateResumesDto {
  @ApiProperty()
  @IsOptional()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  login: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GenderTypes)
  gender: GenderTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsNotEmpty()
  Address: AddressEntity;

  @ApiProperty()
  @IsNotEmpty()
  Phone: PhoneEntity;

  @ApiProperty()
  @IsOptional()
  Educations: EducationsEntity[];

  @ApiProperty()
  @IsOptional()
  Languages: LanguagesEntity[];

  @ApiProperty()
  @IsOptional()
  Experiences: ExperiencesEntity[];

  @ApiProperty()
  @IsOptional()
  Skills: SkillsEntity[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(5)
  @MaxLength(80)
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(5)
  @MaxLength(80)
  @IsString()
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  linkedin: string;
}
