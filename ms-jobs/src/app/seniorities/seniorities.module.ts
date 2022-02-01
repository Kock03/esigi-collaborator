import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SenioritiesController } from "./seniorities.controller";
import { SenioritiesEntity } from "./seniorities.entity";
import { SenioritiesService } from "./seniorities.service";

@Module({

    imports: [TypeOrmModule.forFeature([SenioritiesEntity])],
    controllers: [SenioritiesController],
    providers: [SenioritiesService],
})
export class SenioritiesModule { }