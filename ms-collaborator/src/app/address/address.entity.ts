import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { CollaboratorsEntity } from '../collaborators/collaborators.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  complement: string;

  @OneToOne(() => CollaboratorsEntity, (collaborator) => collaborator.Address)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
