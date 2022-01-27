import { CreateEducationsDto } from "./dtos/create-educations.dto";
import { UpdateEducationsDto } from "./dtos/update-educations.dto";
import { EducationsService } from "./educations.service";
export declare class EducationsController {
    private readonly educationService;
    constructor(educationService: EducationsService);
    index(): Promise<import("./educations.entity").EducationsEntity[]>;
    show(id: string): Promise<import("./educations.entity").EducationsEntity>;
    store(body: CreateEducationsDto): Promise<import("./educations.entity").EducationsEntity>;
    update(id: string, body: UpdateEducationsDto): Promise<import("./educations.entity").EducationsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
