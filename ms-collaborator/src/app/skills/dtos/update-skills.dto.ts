import { IsNotEmpty } from "class-validator";

export class UpdateSkillsDto {

  @IsNotEmpty()
  tecnology: string;

  @IsNotEmpty()
  seniority: string;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;
}
