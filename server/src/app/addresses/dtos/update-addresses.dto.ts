import { IsNotEmpty } from "class-validator";

export class UpdateAddressesDto {

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  complement: string;
}
