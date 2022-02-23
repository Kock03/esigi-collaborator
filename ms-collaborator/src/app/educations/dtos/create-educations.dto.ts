import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class CreateEducationsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  situation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
