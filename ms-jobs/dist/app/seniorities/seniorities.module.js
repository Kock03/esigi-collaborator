"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenioritiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seniorities_controller_1 = require("./seniorities.controller");
const seniorities_entity_1 = require("./seniorities.entity");
const seniorities_service_1 = require("./seniorities.service");
let SenioritiesModule = class SenioritiesModule {
};
SenioritiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([seniorities_entity_1.SenioritiesEntity])],
        controllers: [seniorities_controller_1.SenioritiesController],
        providers: [seniorities_service_1.SenioritiesService],
    })
], SenioritiesModule);
exports.SenioritiesModule = SenioritiesModule;
//# sourceMappingURL=seniorities.module.js.map