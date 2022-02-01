import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsController } from "./documents.controller";
import { DocumentsEntity } from "./documents.entity";
import { DocumentsService } from "./douments.service";

@Module({
    
    imports: [TypeOrmModule.forFeature([DocumentsEntity])],
    controllers: [DocumentsController],
    providers: [DocumentsService],
  })
  export class DocumentsModule {}