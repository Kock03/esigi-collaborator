import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateDocumentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(100)
  @MaxLength(300)
  file: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
