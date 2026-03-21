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
exports.GenerateArticleService = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("../articles/articles.service");
const prisma_service_1 = require("../prisma/prisma.service");
let GenerateArticleService = class GenerateArticleService {
    constructor(prisma, articlesService) {
        this.prisma = prisma;
        this.articlesService = articlesService;
    }
    async generate(dto) {
        const categorySlug = dto.type;
        const category = await this.prisma.category.findUnique({
            where: { slug: categorySlug },
            select: { id: true },
        });
        if (!category) {
            return { success: false, message: `Category not found: ${categorySlug}` };
        }
        if (dto.content && dto.title) {
            const slug = this.slugify(dto.title);
            const article = await this.articlesService.create({
                title: dto.title,
                slug,
                content: dto.content,
                category_id: category.id,
                novel_id: dto.novel_id ?? null,
                character_id: dto.character_id ?? null,
                meta_title: dto.meta_title || dto.title.slice(0, 70),
                meta_description: dto.meta_description || dto.content.slice(0, 160).replace(/\n/g, ' '),
                published: true,
            });
            return {
                success: true,
                message: 'Article created. Integrate AI here to generate content.',
                article: {
                    id: article.id,
                    slug: article.slug,
                    category_slug: categorySlug,
                },
            };
        }
        return {
            success: true,
            message: 'Ready for AI integration. Send title + content to save article.',
        };
    }
    slugify(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
};
exports.GenerateArticleService = GenerateArticleService;
exports.GenerateArticleService = GenerateArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        articles_service_1.ArticlesService])
], GenerateArticleService);
//# sourceMappingURL=generate-article.service.js.map