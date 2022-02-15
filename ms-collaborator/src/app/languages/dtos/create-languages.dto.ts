import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  degreeOfInfluence: degreeOfInfluence;

  @ApiProperty()
  @IsNotEmpty()
  Collaborator: CollaboratorsEntity;
}
