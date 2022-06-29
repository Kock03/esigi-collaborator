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
  @IsOptional()
  @MinLength(1)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  login: string;

  @ApiProperty()
  @IsOptional()
  @Length(11)
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  birthDate: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(GenderTypes)
  gender: GenderTypes;

  @ApiProperty()
  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsOptional()
  Address: AddressEntity;

  @ApiProperty()
  @IsOptional()
  Phone: PhoneEntity;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(1)
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  linkedin: string;
}
