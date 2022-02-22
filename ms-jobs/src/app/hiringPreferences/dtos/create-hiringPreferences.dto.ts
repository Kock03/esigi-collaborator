import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { BehaviroalInterviewsEntity } from "src/app/behavioral-interviews/behavioral-interviews.entity";

export class CreateHiringPreferencesDto {
    @IsOptional()
    @IsBoolean()
    intern: boolean;

    @IsOptional()
    @IsBoolean()
    naturalPerson: boolean;

    @IsOptional()
    @IsBoolean()
    legalPerson: boolean;

    @IsOptional()
    @IsBoolean()
    cooperative: boolean;

    @IsNotEmpty()
    BehaviroalInterview: BehaviroalInterviewsEntity;
}