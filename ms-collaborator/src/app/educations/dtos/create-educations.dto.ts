import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class CreateEducationsDto {
  @ApiProperty()
  @IsNotEmpty()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  situation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
