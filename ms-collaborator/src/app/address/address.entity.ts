import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'number' })
  number: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'disstrict'})
  district: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'complement' })
  complement: string;

  @OneToOne(() => CollaboratorsEntity, collaborator => collaborator.Address)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
