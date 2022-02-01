import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsEntity } from './skills.entity';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SkillsEntity])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
