import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'phone' })
export class PhoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'ddd', length: 2 })
  ddd: string;

  @Column({ name: 'ddi' })
  ddi: string;

  @OneToOne(() => CollaboratorsEntity, collaborator => collaborator.Phone) // specify inverse side as a second parameter
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
