import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { CreateEducationsDto } from "./dtos/create-educations.dto";
import { UpdateEducationsDto } from "./dtos/update-educations.dto";
import { EducationsEntity } from "./educations.entity";
export declare class EducationsService {
    private readonly educationsRepository;
    constructor(educationsRepository: Repository<EducationsEntity>);
    findAll(): Promise<EducationsEntity[]>;
    findOneOrFail(conditions: FindConditions<EducationsEntity>, options?: FindOneOptions<EducationsEntity>): Promise<EducationsEntity>;
    store(data: CreateEducationsDto): Promise<EducationsEntity>;
    update(id: string, data: UpdateEducationsDto): Promise<EducationsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
