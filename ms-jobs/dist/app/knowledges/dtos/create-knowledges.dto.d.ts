import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TypeOfPeriod } from './type-of-period.enum';
export declare class CreateKnowledgesDto {
    name: string;
    yearsExperience: number;
    typeOfPeriod: TypeOfPeriod;
    Job: JobsEntity;
}
