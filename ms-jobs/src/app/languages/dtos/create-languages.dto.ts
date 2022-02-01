import { IsNotEmpty, IsOptional } from "class-validator";
import { JobsEntity } from "src/app/jobs/jobs.entity";

export class CreateLanguagesDto {

    @IsNotEmpty()
    languageName: string;

    @IsNotEmpty()
    degreeOfInfluence: degreeOfInfluence;

    @IsOptional()
    Job: JobsEntity;

}