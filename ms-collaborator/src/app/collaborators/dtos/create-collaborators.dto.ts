import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
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
import { MaritalStatus } from './MaritalStatus.enum';
import { DependentsEntity } from 'src/app/dependents/dependents.entity';
import { FeedbacksEntity } from 'src/app/feedbacks/feedbacks.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from './gender.enum';

export class CreateCollaboratorsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstNameCorporateName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastNameFantasyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  office: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  collaboratorTypes: CollaboratorTypes;

  @ApiProperty()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  admissionDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  cnpj: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  stateRegistration: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Skills: SkillsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Documents: DocumentsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Languages: LanguagesEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Educations: EducationsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  BankData: BankDataEntity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Financials: FinancialsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Dependents: DependentsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Feedbacks: FeedbacksEntity[];
}
