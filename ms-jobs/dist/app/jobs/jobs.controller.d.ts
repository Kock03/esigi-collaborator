import { CreateJobsDto } from "./dtos/create-jobs.dto";
import { UpdateJobsDto } from "./dtos/update-jobs.dto";
import { JobsService } from "./jobs.service";
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    index(): Promise<import("./jobs.entity").JobsEntity[]>;
    show(id: string): Promise<import("./jobs.entity").JobsEntity>;
    store(body: CreateJobsDto): Promise<import("./jobs.entity").JobsEntity>;
    update(id: string, body: UpdateJobsDto): Promise<import("./jobs.entity").JobsEntity>;
    destroy(id: string): Promise<{
        id: string;
    } & import("./jobs.entity").JobsEntity>;
}
