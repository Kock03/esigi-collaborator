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
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { BankDataEntity } from 'src/bank-data/bank-data.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import { CollaboratorTypes } from './dtos/collaborator-types.enum';
import { FinancialsEntity } from 'src/financials/financials.entity';

@Entity({ name: 'collaborators' })
export class CollaboratorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname_corporatename' })
  firstName_corporateName: string;

  @Column({ name: 'lastname_fantasyname' })
  lastName_fantasyName: string;

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
  stateRegistration?: string;

  @Column({ name: 'municipal_inscription' })
  municipalInscription?: string;

  @Column({ name: 'site' })
  site: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => AddressesEntity)
  @JoinTable({
    name: 'collaborators_addresses_collaborators',
  })
  addresses: AddressesEntity[];

  @ManyToMany(() => BankDataEntity)
  @JoinTable({
    name: 'collaborator_bank_data_collaborator',
  })
  bankData: BankDataEntity[];

  @OneToMany(() => PhonesEntity, (phone) => phone.collaborator)
  phone: PhonesEntity[];

  @OneToMany(() => SkillsEntity, (skills) => skills.collaborator)
  skill: SkillsEntity[];

  @OneToOne(() => FinancialsEntity)
  @JoinColumn()
  financial: FinancialsEntity;
}
