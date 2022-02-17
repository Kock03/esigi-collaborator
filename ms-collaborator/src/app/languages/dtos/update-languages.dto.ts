import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { degreeOfInfluence } from './degree-of-influence.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  languageName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  degreeOfInfluence: degreeOfInfluence;

}
