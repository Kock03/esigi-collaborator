import { AddressEntity } from 'src/address/address.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { LanguagesEntity } from 'src/languages/languages.entity';
import { PhoneEntity } from 'src/phone/phone.entity';
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
import { GenderTypes } from './dto/gender-types.enum';

@Entity({ name: 'resumes' })
export class ResumesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photo', nullable: true })
  photo: string;

  @Column({ name: 'first_name', length: 70 })
  firstName: string;

  @Column({ name: 'last_name', length: 70 })
  lastName: string;

  @Column({ name: 'login', length: 40 })
  login: string;

  @Column({ name: 'cpf', unique: true, length: 11, nullable: true })
  cpf: string;

  @Column()
  birthDate: string;

  @Column({ name: 'sex', type: 'int' })
  gender: GenderTypes;

  @Column({ name: 'marital_status', type: 'int' })
  maritalStatus: MaritalStatus;

  @OneToOne(() => AddressEntity, {
    eager: true,
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  Address: AddressEntity;

  @OneToOne(() => PhoneEntity, {
    eager: true,
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  Phone: PhoneEntity;

  @OneToMany(() => EducationsEntity, (educations) => educations.Resume, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  Educations: EducationsEntity[];

  @OneToMany(() => ExperiencesEntity, (experiences) => experiences.Resume, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  Experiences: ExperiencesEntity[];

  @OneToMany(() => SkillsEntity, (skills) => skills.Resume, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  Skills: SkillsEntity[];

  @OneToMany(() => LanguagesEntity, (languages) => languages.Resume, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete'
  })
  Languages: LanguagesEntity[];

  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'site', length: 100,  nullable: true  })
  site: string;

  @Column({ name: 'linkedin', length: 100,  nullable: true  })
  linkedin: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
