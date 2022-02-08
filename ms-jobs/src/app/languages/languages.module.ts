import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguagesController } from "./languages.controller";
import { LanguagesEntity } from "./languages.entity";
import { LanguagesService } from "./languages.service";

@Module({
  imports: [TypeOrmModule.forFeature([LanguagesEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule { }