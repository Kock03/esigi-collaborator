import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Repository } from 'typeorm/repository/Repository';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { UpdateJobsDto } from './dtos/update-jobs.dto';
import { JobsEntity } from './jobs.entity';
export declare class JobsService {
    private readonly jobsRepository;
    constructor(jobsRepository: Repository<JobsEntity>);
    findAll(): Promise<JobsEntity[]>;
    findOneOrFail(conditions: FindConditions<JobsEntity>, options?: FindOneOptions<JobsEntity>): Promise<JobsEntity>;
    store(data: CreateJobsDto): Promise<JobsEntity>;
    update(id: string, data: UpdateJobsDto): Promise<{
        requester: string;
        status: import("./dtos/status.enum").Status;
        publish: boolean;
        client: string;
        typeOfJob: import("./dtos/type.enum").Type;
        temporary: boolean;
        monthTime: string;
        jobName: string;
        startForecast: Date;
        collaboratorActivities: string;
        Seniorities: import("../seniorities/seniorities.entity").SenioritiesEntity;
        jobNumber: number;
        typeOfContract: import("./dtos/typeOfContract.enum").TypeOfContract;
        workplace: import("./dtos/workplace.enum").Workplace;
        workingDay: string;
        minimumValue: number;
        openingDate: Date;
        maximumValue: number;
        schooling: import("./dtos/schooling.enum").Schooling;
        Knowledges: import("../knowledges/knowledges.entity").KnowledgesEntity[];
        skills: string;
        attitudes: string;
        Languages: import("../languages/languages.entity").LanguagesEntity[];
        id: string;
    } & JobsEntity>;
    destroy(id: string): Promise<{
        id: string;
    } & JobsEntity>;
}
