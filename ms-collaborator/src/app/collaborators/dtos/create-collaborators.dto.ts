import { Optional } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
  maxLength,
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
import { MaritalStatus } from "./MaritalStatus.enum";
import { DependentsEntity } from "src/app/dependents/dependents.entity";
import { FeedbacksEntity } from "src/app/feedbacks/feedbacks.entity";

export class CreateCollaboratorsDto {
  @IsNotEmpty()
  firstNameCorporateName: string;

  @IsNotEmpty()
  lastNameFantasyName: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  office: string;

  @IsNotEmpty()
  collaboratorTypes: CollaboratorTypes;

  @IsOptional()
  cpf: string;

  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  admissionDate: Date;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  cnpj: string;

  @IsOptional()
  stateRegistration: string;

  @IsOptional()
  municipalInscription: string;

  @IsOptional()
  site: string;

  @IsOptional()
  linkedin: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  Address: AddressEntity;

  @IsOptional()
  Phone: PhoneEntity;

  @IsOptional()
  Skills: SkillsEntity[];

  @IsOptional()
  Documents: DocumentsEntity[];

  @IsOptional()
  Languages: LanguagesEntity[];

  @IsOptional()
  Educations: EducationsEntity[];

  @IsOptional()
  BankData: BankDataEntity;

  @IsOptional()
  Financials: FinancialsEntity[];

  @IsOptional()
  Dependents: DependentsEntity[];

  @IsOptional()
  Feedbacks: FeedbacksEntity[];
}
