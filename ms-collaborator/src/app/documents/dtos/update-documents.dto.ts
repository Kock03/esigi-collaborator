import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
