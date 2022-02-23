import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/app/collaborators/dtos/gender.enum';
import { Type } from './type.enum';

export class UpdateDependentsDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(Type)
  type: Type;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddi: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MinLength(10)
  @MaxLength(100)
  email: string;
}
