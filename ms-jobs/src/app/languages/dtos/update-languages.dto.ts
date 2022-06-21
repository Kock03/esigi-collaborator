import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  languageName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  degreeOfInfluence: degreeOfInfluence;
}
