import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
