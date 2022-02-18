import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { degreeOfInfluence } from './degree-of-influence.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  languageName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(degreeOfInfluence)
  degreeOfInfluence: degreeOfInfluence;

}
