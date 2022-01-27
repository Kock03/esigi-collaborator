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
exports.PhoneEntity = void 0;
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
const typeorm_1 = require("typeorm");
let PhoneEntity = class PhoneEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PhoneEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number' }),
    __metadata("design:type", String)
], PhoneEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ddd', length: 2 }),
    __metadata("design:type", String)
], PhoneEntity.prototype, "ddd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ddi', length: 3 }),
    __metadata("design:type", String)
], PhoneEntity.prototype, "ddi", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborator => collaborator.Phone),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], PhoneEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], PhoneEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], PhoneEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Date)
], PhoneEntity.prototype, "deletedAt", void 0);
PhoneEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'phone' })
], PhoneEntity);
exports.PhoneEntity = PhoneEntity;
//# sourceMappingURL=phone.entity.js.map