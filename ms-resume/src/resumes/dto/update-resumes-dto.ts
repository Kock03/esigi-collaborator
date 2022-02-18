import { IsNotEmpty, Min, Max, Length, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { AddressEntity } from 'src/address/address.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { PhoneEntity } from 'src/phone/phone.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import { MaritalStatus } from './marital-status.enum';
import { GenderTypes } from './gender-types.enum';
import { LanguagesEntity } from 'src/languages/languages.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumesDto {
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
  @IsNotEmpty()
  @Length(11)
  @IsString()
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
  @IsNotEmpty()
  Educations: EducationsEntity[];

  @ApiProperty()
  @IsNotEmpty()
  Languages: LanguagesEntity[];

  @ApiProperty()
  @IsNotEmpty()
  Experiences: ExperiencesEntity[];

  @ApiProperty()
  @IsNotEmpty()
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
