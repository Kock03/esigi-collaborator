import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhoneDto {
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
}
