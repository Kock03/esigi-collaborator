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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./address.entity");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async findAll() {
        const addressWhiteCollaborator = await this.addressRepository
            .createQueryBuilder('address')
            .getMany();
        return addressWhiteCollaborator;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Collaborator'] };
        try {
            return await this.addressRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const address = this.addressRepository.create(data);
        return await this.addressRepository.save(address);
    }
    async update(id, data) {
        const address = await this.addressRepository.findOneOrFail(id);
        this.addressRepository.merge(address, data);
        return await this.addressRepository.save(address);
    }
    async destroy(id) {
        await this.addressRepository.findOneOrFail({ id });
        return await this.addressRepository.softDelete({ id });
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map