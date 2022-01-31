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
exports.LanguagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const languages_entity_1 = require("./languages.entity");
let LanguagesService = class LanguagesService {
    constructor(languagesRepository) {
        this.languagesRepository = languagesRepository;
    }
    async findAll() {
        const languagesWhiteCollaborator = await this.languagesRepository
            .createQueryBuilder('languages')
            .getMany();
        return languagesWhiteCollaborator;
    }
    async findOneOrfail(conditions, options) {
        options = { relations: ['Job'] };
        try {
            return await this.languagesRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const language = this.languagesRepository.create(data);
        return await this.languagesRepository.save(language);
    }
    async update(id, data) {
        const language = await this.languagesRepository.findOneOrFail({ id });
        this.languagesRepository.merge(language, data);
        return await this.languagesRepository.save(language);
    }
    async destroy(id) {
        await this.languagesRepository.findOneOrFail({ id });
        return await this.languagesRepository.softDelete({ id });
    }
};
LanguagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(languages_entity_1.LanguagesEntity)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], LanguagesService);
exports.LanguagesService = LanguagesService;
//# sourceMappingURL=languages.service.js.map