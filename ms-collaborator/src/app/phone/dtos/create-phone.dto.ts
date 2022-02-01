import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreatePhoneDto {

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  ddd: string;

  @IsNotEmpty()
  ddi: string;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
