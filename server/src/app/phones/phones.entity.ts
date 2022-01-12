import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'phones' })
export class PhonesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'ddd', length: 2 })
  ddd: string;

  @Column({ name: 'ddi', length: 2 })
  ddi: string;

  @ManyToOne(() => CollaboratorsEntity, collaborators => collaborators.phoneNumber)
  collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
