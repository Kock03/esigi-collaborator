import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'number' })
  number: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'complement' })
  complement: string;

  @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.addresses)
  collaborators: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
