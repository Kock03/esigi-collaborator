import { CreateLanguagesDto } from "./dtos/create-languages.dto";
import { UpdateLanguagesDto } from "./dtos/update-languages.dto";
import { LanguagesService } from "./languages.service";
export declare class LanguagesController {
    private readonly languagesService;
    constructor(languagesService: LanguagesService);
    index(): Promise<import("./languages.entity").LanguagesEntity[]>;
    show(id: string): Promise<import("./languages.entity").LanguagesEntity>;
    store(body: CreateLanguagesDto): Promise<import("./languages.entity").LanguagesEntity>;
    update(id: string, body: UpdateLanguagesDto): Promise<{
        languageName: string;
        degreeOfInfluence: degreeOfInfluence;
        id: string;
    } & import("./languages.entity").LanguagesEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
