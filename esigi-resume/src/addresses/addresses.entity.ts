import { ResumesEntity } from 'src/resumes/resumes.entity';
import { ResumesService } from 'src/resumes/resumes.service';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep', length: 8 })
  cep: string;

  @Column({ name: 'street', length: 60 })
  street: string;

  @Column({ name: 'number', length: 10 })
  number: string;

  @Column({ name: 'nighborhood', length: 60 })
  neighborhood: string;

  @Column({ name: 'city', length: 60 })
  city: string;

  @Column({ name: 'state', length: 60 })
  state: string;

  @Column({ name: 'complement', nullable: true, length: 60 })
  complement: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
