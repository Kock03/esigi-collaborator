import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePhoneDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(11)
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddi: string;
}
