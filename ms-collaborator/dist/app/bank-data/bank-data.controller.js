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
exports.BankDataController = void 0;
const common_1 = require("@nestjs/common");
const bank_data_service_1 = require("./bank-data.service");
const create_bank_data_dto_1 = require("./dtos/create-bank-data.dto");
const update_bank_data_dto_1 = require("./dtos/update-bank-data.dto");
let BankDataController = class BankDataController {
    constructor(bankDataService) {
        this.bankDataService = bankDataService;
    }
    async index() {
        return await this.bankDataService.findAll();
    }
    async show(id) {
        return await this.bankDataService.findOneOrFail({ id });
    }
    async store(body) {
        return await this.bankDataService.store(body);
    }
    async update(id, body) {
        return await this.bankDataService.update(id, body);
    }
    async destroy(id) {
        return await this.bankDataService.destroy(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankDataController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDataController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bank_data_dto_1.CreateBankDataDto]),
    __metadata("design:returntype", Promise)
], BankDataController.prototype, "store", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bank_data_dto_1.UpdateBankDataDto]),
    __metadata("design:returntype", Promise)
], BankDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDataController.prototype, "destroy", null);
BankDataController = __decorate([
    (0, common_1.Controller)('/api/v1/bank'),
    __metadata("design:paramtypes", [bank_data_service_1.BankDataService])
], BankDataController);
exports.BankDataController = BankDataController;
//# sourceMappingURL=bank-data.controller.js.map