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

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  languageName: string;

  @ApiProperty()
  @IsOptional()
  degreeOfInfluence: string;

  @ApiProperty()
  @IsOptional()
  Collaborator: CollaboratorsEntity;


}
