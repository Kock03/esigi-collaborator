import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateSenioritiesDto {
  @ApiProperty()
  @IsNotEmpty()
  intern: boolean;

  @ApiProperty()
  @IsNotEmpty()
  junior: boolean;

  @ApiProperty()
  @IsNotEmpty()
  pleno: boolean;

  @ApiProperty()
  @IsNotEmpty()
  senior: boolean;

  @ApiProperty()
  @IsOptional()
  Job: JobsEntity;
}
