import { ResumesEntity } from 'src/resumes/resumes.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'phones' })
export class PhonesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'phone_number', length: 9 })
  phoneNumber: string;

  @Column({ name: 'ddd', length: 2 })
  ddd: string;

  @Column({ name: 'ddi', length: 2 })
  ddi: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
