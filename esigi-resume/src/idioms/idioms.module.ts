import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdiomsController } from './idioms.controller';
import { IdiomsEntity } from './idioms.entity';
import { IdiomsService } from './idioms.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdiomsEntity])],
  controllers: [IdiomsController],
  providers: [IdiomsService],
})
export class IdiomsModule {}
