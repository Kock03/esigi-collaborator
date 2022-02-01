import { JobsEntity } from "src/app/jobs/jobs.entity";
import { TypeOfPeriod } from "./typeOfPeriod.enum";
export declare class UpdateKnowledgesDto {
    name: string;
    yearsExperience: number;
    Job: JobsEntity;
    typeOfPeriod: TypeOfPeriod;
}
