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
exports.BankDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bank_data_entity_1 = require("./bank-data.entity");
let BankDataService = class BankDataService {
    constructor(bankDataRepository) {
        this.bankDataRepository = bankDataRepository;
    }
    async findAll() {
        const banksWhiteCollaborator = await this.bankDataRepository
            .createQueryBuilder('bank_data')
            .getMany();
        return banksWhiteCollaborator;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Collaborator'] };
        try {
            return await (await this.bankDataRepository.findOneOrFail(conditions, options));
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const bank = this.bankDataRepository.create(data);
        return await this.bankDataRepository.save(bank);
    }
    async update(id, data) {
        const bank = await this.bankDataRepository.findOneOrFail({ id });
        this.bankDataRepository.merge(bank, data);
        return await this.bankDataRepository.save(bank);
    }
    async destroy(id) {
        this.bankDataRepository.findOneOrFail({ id });
        return await this.bankDataRepository.softDelete({ id });
    }
};
BankDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bank_data_entity_1.BankDataEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BankDataService);
exports.BankDataService = BankDataService;
//# sourceMappingURL=bank-data.service.js.map