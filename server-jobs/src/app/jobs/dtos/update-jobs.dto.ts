import { IsNotEmpty, IsOptional } from "class-validator";
import { LanguagesEntity } from "src/app/languages/languages.entity";
import { Double } from "typeorm";
import { Schooling } from "./schooling.enum";
import { Seniority } from "./seniority.enum";
import { Status } from "./status.enum";
import { Type } from "./type.enum";
import { TypeOfContract } from "./typeOfContract.enum";
import { Workplace } from "./workplace.enum";

export class UpdateJobsDto{
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
    seniority: Seniority;

    @IsNotEmpty()
    jobNumber: number;

    @IsNotEmpty()
    typeOfContract: TypeOfContract;

    @IsNotEmpty()
    workplace: Workplace;

    @IsNotEmpty()
    workingDay:string;
    
    @IsNotEmpty()
    minimumValue: number;

    @IsNotEmpty()
    maximumValue: number;

    @IsNotEmpty()
    schooling: Schooling; 

    @IsNotEmpty()
    collaboratorActivities: string;

    @IsNotEmpty()
    knowledge: string;

    @IsNotEmpty()
    skills: string;

    @IsNotEmpty()
    attitudes: string;

    @IsNotEmpty()
    Languages: LanguagesEntity[];
}