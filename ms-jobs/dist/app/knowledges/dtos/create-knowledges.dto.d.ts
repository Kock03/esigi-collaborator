import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TypeOfPeriod } from './typeOfPeriod.enum';
export declare class CreateKnowledgesDto {
    name: string;
    yearsExperience: number;
    typeOfPeriod: TypeOfPeriod;
    Job: JobsEntity;
}
