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
exports.AddressEntity = void 0;
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
const typeorm_1 = require("typeorm");
let AddressEntity = class AddressEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AddressEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cep' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'street' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'disstrict' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'complement' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborator => collaborator.Address),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], AddressEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], AddressEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], AddressEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Date)
], AddressEntity.prototype, "deletedAt", void 0);
AddressEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'address' })
], AddressEntity);
exports.AddressEntity = AddressEntity;
//# sourceMappingURL=address.entity.js.map