import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional } from "class-validator";
import { AddressesEntity } from 'src/app/addresses/addresses.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { DocumentsEntity } from "src/app/documents/documents.entity";
import { EducationsEntity } from "src/app/educations/educations.entity";
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { LanguagesEntity } from "src/app/languages/languages.entity";
import { PhonesEntity } from 'src/app/phones/phones.entity';
import { SkillsEntity } from 'src/app/skills/skills.entity';
import { CollaboratorTypes } from './collaborator-types.enum';

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
  
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  stateRegistration: string;

  @IsNotEmpty()
  municipalInscription: string;

  @IsNotEmpty()
  site: string;
  
  @IsNotEmpty()
  photo: string;

  @IsOptional()
  Addresses: AddressesEntity;

  @IsOptional()
  Phone: PhonesEntity;

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
  Financials: FinancialsEntity;
}



