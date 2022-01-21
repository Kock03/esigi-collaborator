import { IsNotEmpty } from "class-validator";
import { JobsEntity } from "src/app/jobs/jobs.entity";

export class UpdateKnowledgesDto {
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    yearsExperience: number;

    @IsNotEmpty()
    Job: JobsEntity;
}