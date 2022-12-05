import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { DocumentsEntity } from 'src/app/documents/documents.entity';
import { EducationsEntity } from 'src/app/educations/educations.entity';
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { SkillsEntity } from 'src/app/skills/skills.entity';
import { CollaboratorTypes } from './types.enum';
import { DependentsEntity } from 'src/app/dependents/dependents.entity';
import { FeedbacksEntity } from 'src/app/feedbacks/feedbacks.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollaboratorsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  firstNameCorporateName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastNameFantasyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  login: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  office: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CollaboratorTypes)
  collaboratorTypes: CollaboratorTypes;

  @ApiProperty()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  maritalStatus: string;

  @ApiProperty()
  @IsOptional()
  birthDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  inactive: boolean;

  @ApiProperty()
  @IsOptional()
  admissionDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(14)
  @MaxLength(14)
  cnpj: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(9)
  @MaxLength(14)
  stateRegistration: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(9)
  @MaxLength(14)
  municipalInscription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  linkedin: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Address: AddressEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Phone: PhoneEntity;
}
