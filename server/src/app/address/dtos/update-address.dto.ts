import { IsNotEmpty } from "class-validator";

export class UpdateAddressDto {

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;
  
  @IsNotEmpty()
  complement: string;
}
