import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateAddressDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  flag: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
