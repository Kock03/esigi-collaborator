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
exports.CollaboratorsController = void 0;
const common_1 = require("@nestjs/common");
const collaborators_service_1 = require("./collaborators.service");
const create_collaborators_dto_1 = require("./dtos/create-collaborators.dto");
const update_collaborators_dto_1 = require("./dtos/update-collaborators.dto");
let CollaboratorsController = class CollaboratorsController {
    constructor(collaboratorsRepository) {
        this.collaboratorsRepository = collaboratorsRepository;
    }
    async index() {
        return await this.collaboratorsRepository.findAll();
    }
    async store(body) {
        console.log("🚀 ~ file: collaborators.controller.ts ~ line 28 ~ CollaboratorsController ~ store ~ body", body);
        return await this.collaboratorsRepository.store(body);
    }
    async show(id) {
        return await this.collaboratorsRepository.findOneOrFail({ id });
    }
    async update(id, body) {
        return await this.collaboratorsRepository.update(id, body);
    }
    async destroy(id) {
        return await this.collaboratorsRepository.destroy(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collaborators_dto_1.CreateCollaboratorsDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "store", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "show", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_collaborators_dto_1.UpdateCollaboratorsDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "destroy", null);
CollaboratorsController = __decorate([
    (0, common_1.Controller)('/api/v1/collaborators'),
    __metadata("design:paramtypes", [collaborators_service_1.CollaboratorsService])
], CollaboratorsController);
exports.CollaboratorsController = CollaboratorsController;
//# sourceMappingURL=collaborators.controller.js.map