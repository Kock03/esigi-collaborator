import { Module } from '@nestjs/common';
import { KnowledgesService } from './knowledges.service';
import { KnowledgesController } from './knowledges.controller';
import { KnowledgesEntity } from './knowledges.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([KnowledgesEntity])],
  providers: [KnowledgesService],
  controllers: [KnowledgesController]
})
export class KnowledgesModule {}
