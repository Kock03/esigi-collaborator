import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(9)
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddd: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddi: string;
}
