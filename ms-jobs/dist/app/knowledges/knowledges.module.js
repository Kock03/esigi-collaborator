"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgesModule = void 0;
const common_1 = require("@nestjs/common");
const knowledges_service_1 = require("./knowledges.service");
const knowledges_controller_1 = require("./knowledges.controller");
const knowledges_entity_1 = require("./knowledges.entity");
const typeorm_1 = require("@nestjs/typeorm");
let KnowledgesModule = class KnowledgesModule {
};
KnowledgesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([knowledges_entity_1.KnowledgesEntity])],
        providers: [knowledges_service_1.KnowledgesService],
        controllers: [knowledges_controller_1.KnowledgesController]
    })
], KnowledgesModule);
exports.KnowledgesModule = KnowledgesModule;
//# sourceMappingURL=knowledges.module.js.map