import { CreateJobsDto } from './dtos/create-jobs.dto';
import { UpdateJobsDto } from './dtos/update-jobs.dto';
import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    index(): Promise<import("./jobs.entity").JobsEntity[]>;
    show(id: string): Promise<import("./jobs.entity").JobsEntity>;
    store(body: CreateJobsDto): Promise<import("./jobs.entity").JobsEntity>;
    update(id: string, body: UpdateJobsDto): Promise<{
        requester: string;
        status: import("./dtos/status.enum").Status;
        publish: boolean;
        client: string;
        typeOfJob: import("./dtos/type.enum").Type;
        temporary: boolean;
        monthTime: string;
        jobName: string;
        startForecast: Date;
        jobNumber: number;
        typeOfContract: import("./dtos/type-of-contract.enum").TypeOfContract;
        workplace: import("./dtos/workplace.enum").Workplace;
        workingDay: string;
        minimumValue: number;
        maximumValue: number;
        schooling: import("./dtos/schooling.enum").Schooling;
        collaboratorActivities: string;
        Knowledges: import("../knowledges/knowledges.entity").KnowledgesEntity[];
        skills: string;
        attitudes: string;
        openingDate: Date;
        Seniorities: import("../seniorities/seniorities.entity").SenioritiesEntity;
        Languages: import("../languages/languages.entity").LanguagesEntity[];
        interviews: import("../interviews/interviews.entity").InterviewsEnitiy[];
        id: string;
    } & import("./jobs.entity").JobsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
