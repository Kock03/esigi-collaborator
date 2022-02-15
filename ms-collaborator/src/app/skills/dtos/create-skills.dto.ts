import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  seniority: Senioridade;

  @ApiProperty()
  @IsNotEmpty()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
