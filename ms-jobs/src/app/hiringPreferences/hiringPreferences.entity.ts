import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BehaviroalInterviewsEntity } from "../behavioral-interviews/behavioral-interviews.entity";

@Entity()
export class HiringPreferencesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    intern: boolean;

    @Column()
    naturalPerson: boolean;

    @Column()
    legalPerson: boolean;

    @Column()
    cooperative: boolean;

    @OneToOne(() => BehaviroalInterviewsEntity, (behaviroalInterviews) => behaviroalInterviews.hiringPreferences)

    BehaviroalInterview: BehaviroalInterviewsEntity;
}