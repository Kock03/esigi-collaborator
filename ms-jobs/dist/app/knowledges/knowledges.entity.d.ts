import { JobsEntity } from "../jobs/jobs.entity";
import { TypeOfPeriod } from "./dtos/typeOfPeriod.enum";
export declare class KnowledgesEntity {
    id: string;
    name: string;
    yearsExperience: number;
    typeOfPeriod: TypeOfPeriod;
    Job: JobsEntity;
}
