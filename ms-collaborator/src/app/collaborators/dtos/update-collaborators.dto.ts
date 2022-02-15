import { IsNotEmpty, IsOptional } from 'class-validator';
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

export class UpdateCollaboratorsDto {
  @ApiProperty()
  @IsNotEmpty()
  firstNameCorporateName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastNameFantasyName: string;

  @ApiProperty()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  office: string;

  @ApiProperty()
  @IsNotEmpty()
  collaboratorTypes: CollaboratorTypes;

  @ApiProperty()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  admissionDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  cnpj: string;

  @ApiProperty()
  @IsOptional()
  stateRegistration: string;

  @ApiProperty()
  @IsOptional()
  municipalInscription: string;

  @ApiProperty()
  @IsOptional()
  site: string;

  @ApiProperty()
  @IsOptional()
  linkedin: string;

  @ApiProperty()
  @IsOptional()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  Address: AddressEntity;

  @ApiProperty()
  @IsNotEmpty()
  Phone: PhoneEntity;

  @ApiPropertyOptional()
  @IsOptional()
  Skills: SkillsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  Documents: DocumentsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  Languages: LanguagesEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  Educations: EducationsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  BankData: BankDataEntity;

  @ApiPropertyOptional()
  @IsOptional()
  Financials: FinancialsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  Dependents: DependentsEntity[];

  @ApiPropertyOptional()
  @IsOptional()
  Feedbacks: FeedbacksEntity[];
}
