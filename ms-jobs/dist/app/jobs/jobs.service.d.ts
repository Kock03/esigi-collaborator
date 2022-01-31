import { FindConditions } from "typeorm/find-options/FindConditions";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Repository } from "typeorm/repository/Repository";
import { CreateJobsDto } from "./dtos/create-jobs.dto";
import { UpdateJobsDto } from "./dtos/update-jobs.dto";
import { JobsEntity } from "./jobs.entity";
export declare class JobsService {
    private readonly jobsRepository;
    constructor(jobsRepository: Repository<JobsEntity>);
    findAll(): Promise<JobsEntity[]>;
    findOneOrFail(conditions: FindConditions<JobsEntity>, options?: FindOneOptions<JobsEntity>): Promise<JobsEntity>;
    store(data: CreateJobsDto): Promise<JobsEntity>;
    update(id: string, data: UpdateJobsDto): Promise<JobsEntity>;
    destroy(id: string): Promise<{
        id: string;
    } & JobsEntity>;
}
