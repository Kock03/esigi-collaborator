import { IsBoolean, IsOptional } from "class-validator";

export class UpdateHiringPreferencesDto {
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
}