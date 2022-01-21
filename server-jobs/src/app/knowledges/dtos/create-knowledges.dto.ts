import { IsNotEmpty } from "class-validator";
import { JobsEntity } from "src/app/jobs/jobs.entity";
import { TypeOfPeriod } from "./typeOfPeriod.enum";

export class CreateKnowledgesDto {

    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    yearsExperience: number;

    @IsNotEmpty()
    Job: JobsEntity;

    @IsNotEmpty()
    typeOfPeriod: TypeOfPeriod;

}