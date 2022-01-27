import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { SkillsEntity } from './skills.entity';
import { CreateSkillsDto } from './dtos/create-skills.dto';
import { UpdateSkillsDto } from './dtos/update-skills.dto';
export declare class SkillsService {
    private readonly skillsRepository;
    constructor(skillsRepository: Repository<SkillsEntity>);
    findAll(): Promise<SkillsEntity[]>;
    findOneOrFail(conditions: FindConditions<SkillsEntity>, options?: FindOneOptions<SkillsEntity>): Promise<SkillsEntity>;
    store(skillsDto: CreateSkillsDto): Promise<SkillsEntity>;
    update(id: string, skillsDto: UpdateSkillsDto): Promise<SkillsEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
