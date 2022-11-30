import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";

@Entity({ name: 'dependents' })
export class DependentsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    gender: string;

    @Column({ unique: true, length: 11 })
    cpf: string;

    @Column()
    birthDate: string;

    @Column()
    age: string;


    @Column()
    phoneNumber: string;

    @Column({ name: 'ddd', length: 2 })
    ddd: string;

    @Column()
    ddi: string;

    @Column()
    email: string;

    @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.Dependents)
    Collaborator: CollaboratorsEntity;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    CreatedAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;
}