import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsEntity } from './skills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillsEntity])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
