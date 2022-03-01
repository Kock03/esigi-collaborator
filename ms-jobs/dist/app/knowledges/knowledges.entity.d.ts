import { JobsEntity } from '../jobs/jobs.entity';
import { TypeOfPeriod } from './dtos/type-of-period.enum';
export declare class KnowledgesEntity {
    id: string;
    name: string;
    yearsExperience: number;
    typeOfPeriod: TypeOfPeriod;
    Job: JobsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
