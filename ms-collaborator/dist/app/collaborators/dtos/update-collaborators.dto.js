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
exports.UpdateCollaboratorsDto = void 0;
const class_validator_1 = require("class-validator");
const address_entity_1 = require("../../address/address.entity");
const bank_data_entity_1 = require("../../bank-data/bank-data.entity");
const financials_entity_1 = require("../../financials/financials.entity");
const phone_entity_1 = require("../../phone/phone.entity");
const collaborator_types_enum_1 = require("./collaborator-types.enum");
class UpdateCollaboratorsDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "firstNameCorporateName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "lastNameFantasyName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateCollaboratorsDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "office", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateCollaboratorsDto.prototype, "collaboratorTypes", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], UpdateCollaboratorsDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "stateRegistration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "municipalInscription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "site", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], UpdateCollaboratorsDto.prototype, "Address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollaboratorsDto.prototype, "linkedin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", phone_entity_1.PhoneEntity)
], UpdateCollaboratorsDto.prototype, "Phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCollaboratorsDto.prototype, "Skills", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCollaboratorsDto.prototype, "Documents", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCollaboratorsDto.prototype, "Languages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCollaboratorsDto.prototype, "Educations", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", bank_data_entity_1.BankDataEntity)
], UpdateCollaboratorsDto.prototype, "BankData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", financials_entity_1.FinancialsEntity)
], UpdateCollaboratorsDto.prototype, "Financials", void 0);
exports.UpdateCollaboratorsDto = UpdateCollaboratorsDto;
//# sourceMappingURL=update-collaborators.dto.js.map