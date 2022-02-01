import { IsNotEmpty } from "class-validator";
import { Schooling } from "./schooling.enum";

export class UpdateEducationsDto{
     
    @IsNotEmpty()
    course: string;
  
    @IsNotEmpty()
    schooling: Schooling

    @IsNotEmpty()
    institution: string;

    @IsNotEmpty()
    situation: Situation;
}