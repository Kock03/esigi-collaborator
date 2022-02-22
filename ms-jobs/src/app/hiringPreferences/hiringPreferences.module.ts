import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HiringPreferencesController } from "./hiringPreferences.controller";
import { HiringPreferencesEntity } from "./hiringPreferences.entity";
import { HiringPreferencesService } from "./hiringPreferences.service";

@Module({

    imports: [TypeOrmModule.forFeature([HiringPreferencesEntity])],
    controllers: [HiringPreferencesController],
    providers: [HiringPreferencesService],
})
export class HiringPreferencesModule { }