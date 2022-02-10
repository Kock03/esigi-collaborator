import { IsNotEmpty, IsOptional } from "class-validator";
import { KnowledgesEntity } from "src/app/knowledges/knowledges.entity";
import { LanguagesEntity } from "src/app/languages/languages.entity";
import { SenioritiesEntity } from "src/app/seniorities/seniorities.entity";
import { Schooling } from "./schooling.enum";
import { Status } from "./status.enum";
import { Type } from "./type.enum";
import { TypeOfContract } from "./typeOfContract.enum";
import { Workplace } from "./workplace.enum";

export class UpdateJobsDto {
    @IsNotEmpty()
    requester: string;

    @IsNotEmpty()
    status: Status;

    @IsNotEmpty()
    publish: boolean;

    @IsNotEmpty()
    client: string;

    @IsNotEmpty()
    typeOfJob: Type;

    @IsNotEmpty()
    temporary: boolean;

    @IsOptional()
    monthTime: string;

    @IsNotEmpty()
    jobName: string;

    @IsNotEmpty()
    startForecast: Date;

    @IsNotEmpty()
    Seniority: SenioritiesEntity;

    @IsNotEmpty()
    jobNumber: number;

    @IsNotEmpty()
    typeOfContract: TypeOfContract;

    @IsNotEmpty()
    workplace: Workplace;

    @IsNotEmpty()
    workingDay: string;

    @IsNotEmpty()
    minimumValue: number;

    @IsNotEmpty()
    maximumValue: number;

    @IsNotEmpty()
    schooling: Schooling;

    @IsNotEmpty()
    Knowledges: KnowledgesEntity[];

    @IsNotEmpty()
    skills: string;

    @IsNotEmpty()
    attitudes: string;

    @IsNotEmpty()
    Languages: LanguagesEntity[];
}