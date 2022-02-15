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
import { PhoneEntity } from 'src/app/phone/phone.entity';
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

  @Column()
  firstNameCorporateName: string;

  @Column()
  lastNameFantasyName: string;

  @Column()
  login: string;

  @Column({ type: 'int' })
  gender: Gender;

  @Column()
  office: string;

  @Column()
  collaboratorTypes: CollaboratorTypes;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  email: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column()
  stateRegistration: string;

  @Column()
  municipalInscription: string;

  @Column()
  site: string;

  @Column()
  linkedin: string;

  @Column({ type: 'blob', nullable: true })
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
  @JoinColumn()
  Skills: SkillsEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Languages: LanguagesEntity[];

  @OneToMany(() => EducationsEntity, (educations) => educations.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Educations: EducationsEntity[];

  @OneToOne(() => PhoneEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Phone: PhoneEntity;

  @OneToOne(() => BankDataEntity, (bank) => bank.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  BankData: BankDataEntity;

  @OneToMany(() => FinancialsEntity, (Financials) => Financials.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Financials: FinancialsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
