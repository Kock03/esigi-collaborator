import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsEntity } from './collaborators.entity';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  imports: [TypeOrmModule.forFeature([CollaboratorsEntity])],
  exports: [CollaboratorsService, TypeOrmModule],
})
export class CollaboratorsModule {}
