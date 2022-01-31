import { FindConditions, FindOneOptions } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CreateLanguagesDto } from "./dtos/create-languages.dto";
import { UpdateLanguagesDto } from "./dtos/update-languages.dto";
import { LanguagesEntity } from "./languages.entity";
export declare class LanguagesService {
    private readonly languagesRepository;
    constructor(languagesRepository: Repository<LanguagesEntity>);
    findAll(): Promise<LanguagesEntity[]>;
    findOneOrfail(conditions: FindConditions<LanguagesEntity>, options?: FindOneOptions<LanguagesEntity>): Promise<LanguagesEntity>;
    store(data: CreateLanguagesDto): Promise<LanguagesEntity>;
    update(id: string, data: UpdateLanguagesDto): Promise<LanguagesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
