import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from 'src/app/address/address.entity';
import { PhonesEntity } from 'src/app/phone/phone.entity';
import { BankDataEntity } from 'src/app/bank-data/bank-data.entity';
import { SkillsEntity } from 'src/app/skills/skills.entity';
import { CollaboratorTypes } from './dtos/collaborator-types.enum';
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { DocumentsEntity } from '../documents/documents.entity';
import { LanguagesEntity } from '../languages/languages.entity';
import { EducationsEntity } from '../educations/educations.entity';

@Entity({ name: 'collaborators' })
export class CollaboratorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname_corporatename' })
  firstNameCorporateName: string;

  @Column({ name: 'lastname_fantasyname' })
  lastNameFantasyName: string;

  @Column({ name: 'login' })
  login: string;

  @Column({ name: 'gender', type: 'int' })
  gender: Gender;

  @Column({ name: 'office' })
  office: string;

  @Column({ name: 'collaborator_types' })
  collaboratorTypes: CollaboratorTypes;

  @Column({ name: 'cpf', unique: true })
  cpf: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'municipal_inscription' })
  municipalInscription: string;

  @Column({ name: 'site' })
  site: string;

  @Column({ name: 'photo', type: 'blob', nullable: true })
  photo: string;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Address: AddressEntity;

  @OneToMany(() => SkillsEntity, (skills) => skills.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Skills: SkillsEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Languages: LanguagesEntity[];

  @OneToMany(() => EducationsEntity, (educations) => educations.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Educations: EducationsEntity[];

  @OneToOne(() => PhonesEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Phone: PhonesEntity;

  @OneToOne(() => BankDataEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  BankData: BankDataEntity;

  @OneToOne(() => FinancialsEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Financials: FinancialsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
