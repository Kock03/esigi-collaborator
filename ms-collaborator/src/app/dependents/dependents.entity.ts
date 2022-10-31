import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";
import { Gender } from "../collaborators/dtos/gender.enum";
import { Type } from "./dtos/type.enum";

@Entity({ name: 'dependents' })
export class DependentsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: Type;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'int' })
    gender: Gender;

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

    @Column({ name: 'ddi', length: 3 })
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