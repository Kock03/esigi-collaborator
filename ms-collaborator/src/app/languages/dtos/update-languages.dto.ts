import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { degreeOfInfluence } from './degree-of-influence.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  languageName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(degreeOfInfluence)
  degreeOfInfluence: degreeOfInfluence;

  @ApiProperty()
  @IsOptional()
  Collaborator: CollaboratorsEntity;


}
