import { IsNotEmpty, IsOptional } from "class-validator";
import { SenioritiesEntity } from "src/app/seniorities/seniorities.entity";
import { Schooling } from "./schooling.enum";
import { Status } from "./status.enum";
import { Type } from "./type.enum";
import { TypeOfContract } from "./typeOfContract.enum";
import { Workplace } from "./workplace.enum";

export class CreateJobsDto{
     
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
    collaboratorActivities: string;

    @IsNotEmpty()
    knowledge: string;

    @IsNotEmpty()
    skills: string;

    @IsNotEmpty()
    attitudes: string;

    @IsNotEmpty()
    openingDate: Date;

    @IsNotEmpty()
    Seniority: SenioritiesEntity;

}