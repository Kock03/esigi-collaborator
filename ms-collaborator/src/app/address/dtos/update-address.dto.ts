import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateAddressDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  district: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement: string;
}
