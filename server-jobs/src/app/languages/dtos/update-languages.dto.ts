import { IsNotEmpty } from "class-validator";
import { degreeOfInfluence } from "./degree-of-influence";

export class UpdateLanguagesDto{
     
    @IsNotEmpty()
    languageName: string;
  
    @IsNotEmpty()
    degreeOfInfluence: degreeOfInfluence;

}