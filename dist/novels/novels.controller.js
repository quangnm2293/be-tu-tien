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
exports.NovelsController = void 0;
const common_1 = require("@nestjs/common");
const novels_service_1 = require("./novels.service");
let NovelsController = class NovelsController {
    constructor(novelsService) {
        this.novelsService = novelsService;
    }
    findAll() {
        return this.novelsService.findAll();
    }
    findTrending() {
        return this.novelsService.findTrending();
    }
    findBySlug(slug) {
        return this.novelsService.findBySlug(slug);
    }
    create(body) {
        return this.novelsService.create(body);
    }
};
exports.NovelsController = NovelsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NovelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NovelsController.prototype, "findTrending", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NovelsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NovelsController.prototype, "create", null);
exports.NovelsController = NovelsController = __decorate([
    (0, common_1.Controller)('novels'),
    __metadata("design:paramtypes", [novels_service_1.NovelsService])
], NovelsController);
//# sourceMappingURL=novels.controller.js.map