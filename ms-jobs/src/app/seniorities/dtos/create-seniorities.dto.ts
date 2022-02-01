import { IsNotEmpty } from "class-validator";
import { JobsEntity } from "src/app/jobs/jobs.entity";

export class CreateSenioritiesDto{

    @IsNotEmpty()
    intern: boolean;
  
    @IsNotEmpty()
    junior: boolean;

    @IsNotEmpty()
    pleno: boolean;

    @IsNotEmpty()
    senior: boolean;

    @IsNotEmpty()
    Job: JobsEntity;
}