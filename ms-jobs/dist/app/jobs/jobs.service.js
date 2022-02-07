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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const jobs_entity_1 = require("./jobs.entity");
let JobsService = class JobsService {
    constructor(jobsRepository) {
        this.jobsRepository = jobsRepository;
    }
    async findAll() {
        const jobsWhiteAll = await this.jobsRepository.find();
        return jobsWhiteAll;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Knowledges', 'Seniorities', 'Languages'] };
        try {
            return await this.jobsRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.Message);
        }
    }
    async store(data) {
        const job = this.jobsRepository.create(data);
        console.log("🚀 ~ file: jobs.service.ts ~ line 39 ~ JobsService ~ store ~ job", job);
        return await this.jobsRepository.save(job);
    }
    async update(id, data) {
        console.log("🚀 ~ file: jobs.service.ts ~ line 43 ~ JobsService ~ update ~ data", data);
        const job = await this.jobsRepository.findOneOrFail({ id });
        if (!job) {
            throw new common_1.HttpException('Not found', 404);
        }
        return await this.jobsRepository.save(Object.assign({ id: id }, data));
    }
    async destroy(id) {
        try {
            await this.jobsRepository.findOneOrFail({ id });
        }
        catch (error) {
            throw new common_1.HttpException('Registro não existe ou invalido', 404);
        }
        return await this.jobsRepository.softRemove({ id });
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(jobs_entity_1.JobsEntity)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map