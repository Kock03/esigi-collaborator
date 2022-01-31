import { IsNotEmpty, Length } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreatePhoneDto {
  @IsNotEmpty()
  @Length(9)
  phoneNumber: string;

  @IsNotEmpty()
  @Length(2)
  ddd: string;

  @IsNotEmpty()
  @Length(2)
  ddi: string;
}
