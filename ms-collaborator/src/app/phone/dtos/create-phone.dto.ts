import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  ddd: string;

  @ApiProperty()
  @IsNotEmpty()
  ddi: string;

  @ApiProperty()
  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
