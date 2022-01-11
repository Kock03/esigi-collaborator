import { IsNotEmpty } from 'class-validator';
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { BankDataEntity } from 'src/bank-data/bank-data.entity';
import { FinancialsEntity } from 'src/financials/financials.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import { CollaboratorTypes } from './collaborator-types.enum';

export class CreateCollaboratorsDto {

  @IsNotEmpty()
  firstNameCorporateName: string;

  @IsNotEmpty()
  lastNameFantasyName: string;

  @IsNotEmpty()
  collaboratorTypes: CollaboratorTypes;
  
  cpf: string;
  birthDate: Date;
  email: string;
  cnpj?: string;
  stateRegistration?: string;
  municipalInscription?: string;
  stie: string;
  addresses: AddressesEntity[];
  bankData: BankDataEntity[];
  phone: PhonesEntity[];
  skill: SkillsEntity[];
  financial: FinancialsEntity;
}
