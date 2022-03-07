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
  @MinLength(9)
  @MaxLength(9)
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddi: string;
}
