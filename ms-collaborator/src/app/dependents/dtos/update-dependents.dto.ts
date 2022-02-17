import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/app/collaborators/dtos/gender.enum';
import { Type } from './type.enum';

export class UpdateDependentsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  type: Type;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ddi: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
}
