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
import { CollaboratorTypes } from './dtos/types.enum';
import { FinancialsEntity } from 'src/app/financials/financials.entity';
import { DocumentsEntity } from '../documents/documents.entity';
import { LanguagesEntity } from '../languages/languages.entity';
import { EducationsEntity } from '../educations/educations.entity';
import { DependentsEntity } from '../dependents/dependents.entity';
import { FeedbacksEntity } from '../feedbacks/feedbacks.entity';
import { IResource } from './_model/resource.model';

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

  @Column()
  gender: string;

  @Column()
  maritalStatus: string;

  @Column()
  office: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  collaboratorTypes: CollaboratorTypes;

  @Column({ unique: true, length: 11, nullable: true })
  cpf: string;

  @Column()
  birthDate: string;

  @Column()
  email: string;

  @Column()
  inactive: boolean;

  @Column()
  admissionDate: string;

  @Column({ unique: true, length: 14, nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  stateRegistration: string;

  @Column({ nullable: true })
  municipalInscription: string;

  @Column({ nullable: true })
  site: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  PermissionId: string;

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

  @OneToMany(() => FeedbacksEntity, (feed) => feed.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Feedbacks: FeedbacksEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Collaborator, {
    cascade: ['insert', 'update', 'soft-remove'],
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

  @OneToMany(() => BankDataEntity, (bank) => bank.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  BankData: BankDataEntity[];

  @OneToMany(() => FinancialsEntity, (Financials) => Financials.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Financials: FinancialsEntity[];

  @OneToMany(() => DependentsEntity, (Dependents) => Dependents.Collaborator, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    nullable: true,
  })
  @JoinColumn()
  Dependents: DependentsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  resource: IResource;
}
