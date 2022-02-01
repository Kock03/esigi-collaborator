import { IsNotEmpty } from "class-validator";

export class UpdatePhoneDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  ddd: string;

  @IsNotEmpty()
  ddi: string;
}
