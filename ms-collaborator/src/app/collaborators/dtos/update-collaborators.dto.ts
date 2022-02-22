import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
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

export class UpdateCollaboratorsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  firstNameCorporateName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  lastNameFantasyName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  office: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CollaboratorTypes)
  collaboratorTypes: CollaboratorTypes;

  @ApiProperty()
  @IsOptional()
  @Length(4)
  cpf: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsOptional()
  admissionDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MinLength(10)
  @MaxLength(150)
  email: string;

  @ApiProperty()
  @IsOptional()
  @Length(14)
  cnpj: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  stateRegistration: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  municipalInscription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  linkedin: string;

  @ApiProperty()
  @IsOptional()
  photo: Buffer;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Address: AddressEntity;

  @ApiProperty()
  @IsOptional()
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
