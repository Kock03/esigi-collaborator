import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsController } from "./jobs.controller";
import { JobsEntity } from "./jobs.entity";
import { JobsService } from "./jobs.service";

@Module({

    imports: [TypeOrmModule.forFeature([JobsEntity])],
    controllers: [JobsController],
    providers: [JobsService],
})
export class JobsModule { }