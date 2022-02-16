import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { degreeOfInfluence } from './degree-of-influence.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  degreeOfInfluence: degreeOfInfluence;
}
