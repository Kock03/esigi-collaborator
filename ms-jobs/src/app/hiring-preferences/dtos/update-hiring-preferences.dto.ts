import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateHiringPreferencesDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  intern: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  naturalPerson: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  legalPerson: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cooperative: boolean;
}
