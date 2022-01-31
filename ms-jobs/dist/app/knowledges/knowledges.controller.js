"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgesController = void 0;
const common_1 = require("@nestjs/common");
const create_knowledges_dto_1 = require("./dtos/create-knowledges.dto");
const update_knowledges_dto_1 = require("./dtos/update-knowledges.dto");
const knowledges_service_1 = require("./knowledges.service");
let KnowledgesController = class KnowledgesController {
    constructor(KnowledgesService) {
        this.KnowledgesService = KnowledgesService;
    }
    async index() {
        return await this.KnowledgesService.findAll();
    }
    async show(id) {
        return await this.KnowledgesService.findOneOrfail({ id });
    }
    async store(body) {
        console.log("🚀 ~ file: jobs.controller.ts ~ line 22 ~ KnowledgesController ~ store ~ body", body);
        return await this.KnowledgesService.store(body);
    }
    async update(id, body) {
        return await this.KnowledgesService.update(id, body);
    }
    async destroy(id) {
        return await this.KnowledgesService.destroy(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowledgesController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KnowledgesController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_knowledges_dto_1.CreateKnowledgesDto]),
    __metadata("design:returntype", Promise)
], KnowledgesController.prototype, "store", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_knowledges_dto_1.UpdateKnowledgesDto]),
    __metadata("design:returntype", Promise)
], KnowledgesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KnowledgesController.prototype, "destroy", null);
KnowledgesController = __decorate([
    (0, common_1.Controller)('/api/v1/knowledges'),
    __metadata("design:paramtypes", [knowledges_service_1.KnowledgesService])
], KnowledgesController);
exports.KnowledgesController = KnowledgesController;
//# sourceMappingURL=knowledges.controller.js.map