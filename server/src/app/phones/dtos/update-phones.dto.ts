import { IsNotEmpty } from "class-validator";

export class UpdatePhonesDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  ddd: string;

  @IsNotEmpty()
  ddi: string;
}
