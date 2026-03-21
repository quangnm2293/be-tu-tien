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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
let ArticlesController = class ArticlesController {
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    findLatest(limit) {
        return this.articlesService.findLatest(limit ? parseInt(limit, 10) : 10);
    }
    findPopular(limit) {
        return this.articlesService.findPopular(limit ? parseInt(limit, 10) : 10);
    }
    sitemap() {
        return this.articlesService.findAllForSitemap();
    }
    findByCategory(categorySlug, limit, offset) {
        return this.articlesService.findByCategorySlug(categorySlug, limit ? parseInt(limit, 10) : 50, offset ? parseInt(offset, 10) : 0);
    }
    findBySlugAndCategory(categorySlug, articleSlug) {
        return this.articlesService.findBySlugAndCategory(categorySlug, articleSlug);
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Get)('latest'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findLatest", null);
__decorate([
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)('sitemap'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "sitemap", null);
__decorate([
    (0, common_1.Get)('category/:categorySlug'),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('category/:categorySlug/:articleSlug'),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Param)('articleSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findBySlugAndCategory", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map