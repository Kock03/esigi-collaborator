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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsEntity = void 0;
const typeorm_1 = require("typeorm");
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
let DocumentsEntity = class DocumentsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], DocumentsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file', type: 'blob' }),
    __metadata("design:type", String)
], DocumentsEntity.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborator => collaborator.Documents),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], DocumentsEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DocumentsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DocumentsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], DocumentsEntity.prototype, "deletedAt", void 0);
DocumentsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'documents' })
], DocumentsEntity);
exports.DocumentsEntity = DocumentsEntity;
//# sourceMappingURL=documents.entity.js.map