import { CreateJobsDto } from "./dtos/create-jobs.dto";
import { UpdateJobsDto } from "./dtos/update-jobs.dto";
import { JobsService } from "./jobs.service";
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
    } & import("./jobs.entity").JobsEntity>;
    destroy(id: string): Promise<{
        id: string;
    } & import("./jobs.entity").JobsEntity>;
}
