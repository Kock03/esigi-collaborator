import { IsNotEmpty } from "class-validator";

export class UpdateLanguagesDto {

    @IsNotEmpty()
    languageName: string;

    @IsNotEmpty()
    degreeOfInfluence: string;
}