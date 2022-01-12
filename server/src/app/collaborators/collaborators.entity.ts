import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressesEntity } from 'src/app/addresses/addresses.entity';
import { PhonesEntity } from 'src/app/phones/phones.entity';
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

  @Column({name:'login'})
  login: string;

  @Column({name:'gender', type:'int'})
  gender: Gender;

  @Column({name:'office'})
  office: string;

  @Column({ name: 'collaborator_types' })
  collaboratorTypes: CollaboratorTypes;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'cnpj' })
  cnpj?: string;

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'municipal_inscription' })
  municipalInscription: string;

  @Column({ name: 'site' })
  site: string;

  @OneToMany(() => AddressesEntity, addresses => addresses.collaborators)
  addresses: AddressesEntity[];

  @OneToMany(() => PhonesEntity, phone => phone.collaborator)
  phoneNumber: PhonesEntity[];

  @OneToMany(() => SkillsEntity, skills => skills.collaborator)
  skills: SkillsEntity[];

  @OneToMany(() => DocumentsEntity, documents => documents.collaborator)
  documents: DocumentsEntity[];

  @OneToMany(() => LanguagesEntity, languages => languages.collaborator)
  languages: LanguagesEntity[];

  @OneToMany(() => EducationsEntity, educations => educations.collaborator)
  educations: EducationsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  

  

  
}
