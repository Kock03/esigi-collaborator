import { CreateSkillsDto } from './dtos/create-skills.dto';
import { UpdateSkillsDto } from './dtos/update-skills.dto';
import { SkillsService } from './skills.service';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    index(): Promise<import("./skills.entity").SkillsEntity[]>;
    show(id: string): Promise<import("./skills.entity").SkillsEntity>;
    store(body: CreateSkillsDto): Promise<import("./skills.entity").SkillsEntity>;
    update(id: string, body: UpdateSkillsDto): Promise<import("./skills.entity").SkillsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
