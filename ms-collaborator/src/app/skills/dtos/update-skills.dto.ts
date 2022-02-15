import { IsNotEmpty } from "class-validator";

export class UpdateSkillsDto {

  @IsNotEmpty()
  technology: string;
  
  @IsNotEmpty()
  seniority: Senioridade;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;
}
