import { IsNotEmpty } from "class-validator";

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