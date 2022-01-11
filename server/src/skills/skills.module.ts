import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsEntity } from './skills.entity';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [TypeOrmModule.forFeature([SkillsEntity])],
  exports: [SkillsService],
})
export class SkillsModule {}
