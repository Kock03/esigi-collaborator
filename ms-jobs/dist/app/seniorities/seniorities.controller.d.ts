import { CreateSenioritiesDto } from './dtos/create-seniorities.dto';
import { UpdateSenioritiesDto } from './dtos/update-seniorities.dto';
import { SenioritiesService } from './seniorities.service';
export declare class SenioritiesController {
    private readonly senioritiesService;
    constructor(senioritiesService: SenioritiesService);
    index(): Promise<import("./seniorities.entity").SenioritiesEntity[]>;
    show(id: string): Promise<import("./seniorities.entity").SenioritiesEntity>;
    store(body: CreateSenioritiesDto): Promise<import("./seniorities.entity").SenioritiesEntity>;
    update(id: string, body: UpdateSenioritiesDto): Promise<import("./seniorities.entity").SenioritiesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
