import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesEntity } from './experiences.entity';
import { ExperiencesService } from './experiences.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  imports: [TypeOrmModule.forFeature([ExperiencesEntity])],
})
export class ExperiencesModule {}
