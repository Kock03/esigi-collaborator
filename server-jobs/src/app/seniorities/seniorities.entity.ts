import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobsEntity } from "../jobs/jobs.entity";

@Entity()
export class SenioritiesEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    intern: boolean;

    @Column()
    junior: boolean;

    @Column()
    pleno: boolean;

    @Column()
    senior: boolean;

    @OneToOne(() => JobsEntity)
    @JoinColumn()
    Job: JobsEntity;

}