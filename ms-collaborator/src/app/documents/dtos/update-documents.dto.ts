import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateDocumentsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  file: string;
}
