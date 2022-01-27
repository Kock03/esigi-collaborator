import { AddressEntity } from 'src/app/address/address.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { DocumentsEntity } from "src/app/documents/documents.entity";
import { EducationsEntity } from "src/app/educations/educations.entity";
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { LanguagesEntity } from "src/app/languages/languages.entity";
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { SkillsEntity } from 'src/app/skills/skills.entity';
import { CollaboratorTypes } from './collaborator-types.enum';
export declare class CreateCollaboratorsDto {
    firstNameCorporateName: string;
    lastNameFantasyName: string;
    login: string;
    gender: Gender;
    office: string;
    collaboratorTypes: CollaboratorTypes;
    cpf: string;
    birthDate: Date;
    email: string;
    cnpj: string;
    stateRegistration: string;
    municipalInscription: string;
    site: string;
    photo: string;
    Address: AddressEntity;
    linkedin: string;
    Phone: PhoneEntity;
    Skills: SkillsEntity[];
    Documents: DocumentsEntity[];
    Languages: LanguagesEntity[];
    Educations: EducationsEntity[];
    BankData: BankDataEntity;
    Financials: FinancialsEntity;
}
