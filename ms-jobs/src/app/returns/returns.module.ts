import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnsEntity } from './returns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnsEntity])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
