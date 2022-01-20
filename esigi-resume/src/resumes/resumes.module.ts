import { Module } from '@nestjs/common';
import { ResumesEntity } from './resumes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports: [TypeOrmModule.forFeature([ResumesEntity])],
})
export class ResumesModule {}
