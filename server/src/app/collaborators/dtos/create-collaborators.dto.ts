import { IsNotEmpty } from "class-validator";
import { AddressesEntity } from 'src/app/addresses/addresses.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { FinancialsEntity } from 'src/app/financials/financials.entity';
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
}


