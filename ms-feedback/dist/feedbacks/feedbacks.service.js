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
exports.FeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedbacks_entity_1 = require("./feedbacks.entity");
let FeedbacksService = class FeedbacksService {
    constructor(feedbacksRepository) {
        this.feedbacksRepository = feedbacksRepository;
    }
    async findAll() {
        return await this.feedbacksRepository.find();
    }
    async findOneOrFail(conditions, options) {
        try {
            return await this.feedbacksRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const feedbacks = this.feedbacksRepository.create(data);
        return await this.feedbacksRepository.save(feedbacks);
    }
    async update(id, data) {
        const feedbacks = await this.feedbacksRepository.findOne({ id });
        this.feedbacksRepository.merge(feedbacks, data);
        return await this.feedbacksRepository.save(feedbacks);
    }
    async destroy(id) {
        await this.feedbacksRepository.findOne({ id });
        return await this.feedbacksRepository.softDelete({ id });
    }
};
FeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedbacks_entity_1.FeedbacksEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map