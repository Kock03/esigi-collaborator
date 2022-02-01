import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesController } from './languages.controller';
import { LanguagesEntity } from './languages.entity';
import { IdiomsService } from './languages.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguagesEntity])],
  controllers: [LanguagesController],
  providers: [IdiomsService],
})
export class LanguagesModule {}
