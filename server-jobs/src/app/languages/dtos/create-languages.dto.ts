import { IsNotEmpty } from "class-validator";
import { JobsEntity } from "src/app/jobs/jobs.entity";
import { degreeOfInfluence } from "./degree-of-influence";

export class CreateLanguagesDto{
     
    @IsNotEmpty()
    languageName: string;
  
    @IsNotEmpty()
    degreeOfInfluence: degreeOfInfluence;

    @IsNotEmpty()
    Job: JobsEntity;

}