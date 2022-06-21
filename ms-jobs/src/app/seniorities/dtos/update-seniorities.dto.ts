import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSenioritiesDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  intern: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  junior: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  pleno: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  senior: boolean;
}
