import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  degreeOfInfluence: degreeOfInfluence;
}
