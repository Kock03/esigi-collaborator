import { AddressesEntity } from 'src/addresses/addresses.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { IdiomsEntity } from 'src/idioms/idioms.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MaritalStatus } from './dto/marital-status.enum';
import { SexTypes } from './dto/sex-types.enum';

@Entity({ name: 'resumes' })
export class ResumesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photo', type: 'blob', nullable: true })
  photo: string;

  @Column({ name: 'first_name', length: 70 })
  firstName: string;

  @Column({ name: 'last_name', length: 70 })
  lastName: string;

  @Column({ name: 'login', length: 40 })
  login: string;

  @Column({ name: 'cpf', unique: true, length: 11 })
  cpf: string;

  @CreateDateColumn({ name: 'birth_date', type: 'datetime' })
  birthDate: Date;

  @Column({ name: 'sex', type: 'int' })
  sex: SexTypes;

  @Column({ name: 'marital_status', type: 'int' })
  maritalStatus: MaritalStatus;

  @OneToOne(() => AddressesEntity, {
    /*eager: true,*/
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  addresses: AddressesEntity;

  @OneToOne(() => PhonesEntity, {
    /*eager: true,*/
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  phones: PhonesEntity;

  @OneToMany(() => EducationsEntity, (educations) => educations.resume, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  educations: EducationsEntity[];

  @OneToMany(() => ExperiencesEntity, (experiences) => experiences.resume, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  experience: ExperiencesEntity[];

  @OneToMany(() => SkillsEntity, (skills) => skills.resume, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  skills: SkillsEntity[];

  @OneToMany(() => IdiomsEntity, (idioms) => idioms.resume, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  idioms: IdiomsEntity[];

  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'site', length: 100 })
  site: string;

  @Column({ name: 'linkedin', length: 100 })
  linkedin: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
