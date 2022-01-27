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
exports.CreateCollaboratorsDto = void 0;
const class_validator_1 = require("class-validator");
const address_entity_1 = require("../../address/address.entity");
const bank_data_entity_1 = require("../../bank-data/bank-data.entity");
const financials_entity_1 = require("../../financials/financials.entity");
const phone_entity_1 = require("../../phone/phone.entity");
const collaborator_types_enum_1 = require("./collaborator-types.enum");
class CreateCollaboratorsDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "firstNameCorporateName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "lastNameFantasyName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCollaboratorsDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "office", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCollaboratorsDto.prototype, "collaboratorTypes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateCollaboratorsDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "stateRegistration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "municipalInscription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "site", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], CreateCollaboratorsDto.prototype, "Address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollaboratorsDto.prototype, "linkedin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", phone_entity_1.PhoneEntity)
], CreateCollaboratorsDto.prototype, "Phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCollaboratorsDto.prototype, "Skills", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCollaboratorsDto.prototype, "Documents", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCollaboratorsDto.prototype, "Languages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCollaboratorsDto.prototype, "Educations", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", bank_data_entity_1.BankDataEntity)
], CreateCollaboratorsDto.prototype, "BankData", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", financials_entity_1.FinancialsEntity)
], CreateCollaboratorsDto.prototype, "Financials", void 0);
exports.CreateCollaboratorsDto = CreateCollaboratorsDto;
//# sourceMappingURL=create-collaborators.dto.js.map