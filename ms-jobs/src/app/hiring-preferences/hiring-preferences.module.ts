import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiringPreferencesController } from './hiring-preferences.controller';
import { HiringPreferencesEntity } from './hiring-preferences.entity';
import { HiringPreferencesService } from './hiring-preferences.service';

@Module({
  imports: [TypeOrmModule.forFeature([HiringPreferencesEntity])],
  controllers: [HiringPreferencesController],
  providers: [HiringPreferencesService],
})
export class HiringPreferencesModule {}
