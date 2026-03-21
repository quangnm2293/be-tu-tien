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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const selectListItem = {
    id: true,
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
    viewCount: true,
    publishedAt: true,
    category: { select: { name: true, slug: true } },
    novel: { select: { title: true, slug: true } },
};
function toListItem(a) {
    return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        featured_image: a.featuredImage,
        view_count: a.viewCount,
        published_at: a.publishedAt.toISOString(),
        categories: a.category ? { name: a.category.name, slug: a.category.slug } : undefined,
        novels: a.novel ? { title: a.novel.title, slug: a.novel.slug } : null,
    };
}
let ArticlesService = class ArticlesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findLatest(limit = 10) {
        const list = await this.prisma.article.findMany({
            where: { published: true },
            select: selectListItem,
            orderBy: { publishedAt: 'desc' },
            take: limit,
        });
        return list.map((a) => toListItem(a));
    }
    async findPopular(limit = 10) {
        const list = await this.prisma.article.findMany({
            where: { published: true },
            select: selectListItem,
            orderBy: { viewCount: 'desc' },
            take: limit,
        });
        return list.map((a) => toListItem(a));
    }
    async findByCategorySlug(categorySlug, limit = 50, offset = 0) {
        const category = await this.prisma.category.findUnique({
            where: { slug: categorySlug },
            select: { id: true },
        });
        if (!category)
            return { data: [], total: 0 };
        const [list, total] = await Promise.all([
            this.prisma.article.findMany({
                where: { categoryId: category.id, published: true },
                select: selectListItem,
                orderBy: { publishedAt: 'desc' },
                skip: offset,
                take: limit,
            }),
            this.prisma.article.count({
                where: { categoryId: category.id, published: true },
            }),
        ]);
        return {
            data: list.map((a) => toListItem(a)),
            total,
        };
    }
    async findBySlugAndCategory(categorySlug, articleSlug) {
        const category = await this.prisma.category.findUnique({
            where: { slug: categorySlug },
            select: { id: true },
        });
        if (!category)
            return null;
        const article = await this.prisma.article.findFirst({
            where: { categoryId: category.id, slug: articleSlug, published: true },
            include: {
                category: { select: { name: true, slug: true } },
                novel: { select: { id: true, title: true, slug: true, coverImage: true } },
                character: { select: { id: true, name: true, slug: true } },
            },
        });
        if (!article)
            return null;
        await this.prisma.article.update({
            where: { id: article.id },
            data: { viewCount: article.viewCount + 1 },
        });
        const related = await this.findRelated(article.id, article.novelId, article.categoryId, 5);
        const result = {
            id: article.id,
            title: article.title,
            slug: article.slug,
            content: article.content,
            excerpt: article.excerpt,
            category_id: article.categoryId,
            novel_id: article.novelId,
            character_id: article.characterId,
            meta_title: article.metaTitle,
            meta_description: article.metaDescription,
            featured_image: article.featuredImage,
            view_count: article.viewCount + 1,
            published: article.published,
            published_at: article.publishedAt.toISOString(),
            created_at: article.createdAt.toISOString(),
            updated_at: article.updatedAt.toISOString(),
            categories: article.category ? { name: article.category.name, slug: article.category.slug } : undefined,
            novels: article.novel
                ? { id: article.novel.id, title: article.novel.title, slug: article.novel.slug, cover_image: article.novel.coverImage }
                : null,
            characters: article.character ? { id: article.character.id, name: article.character.name, slug: article.character.slug } : undefined,
            related,
        };
        return result;
    }
    async findRelated(articleId, novelId, categoryId, limit = 5) {
        const where = {
            published: true,
            id: { not: articleId },
        };
        if (novelId)
            where.novelId = novelId;
        else
            where.categoryId = categoryId;
        const list = await this.prisma.article.findMany({
            where,
            select: selectListItem,
            orderBy: { publishedAt: 'desc' },
            take: limit,
        });
        return list.map((a) => toListItem(a));
    }
    async create(payload) {
        const article = await this.prisma.article.create({
            data: {
                title: payload.title,
                slug: payload.slug,
                content: payload.content,
                categoryId: payload.category_id,
                novelId: payload.novel_id ?? undefined,
                characterId: payload.character_id ?? undefined,
                metaTitle: payload.meta_title ?? undefined,
                metaDescription: payload.meta_description ?? undefined,
                published: payload.published ?? true,
            },
        });
        return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            content: article.content,
            excerpt: article.excerpt,
            category_id: article.categoryId,
            novel_id: article.novelId,
            character_id: article.characterId,
            meta_title: article.metaTitle,
            meta_description: article.metaDescription,
            featured_image: article.featuredImage,
            view_count: article.viewCount,
            published: article.published,
            published_at: article.publishedAt.toISOString(),
            created_at: article.createdAt.toISOString(),
            updated_at: article.updatedAt.toISOString(),
        };
    }
    async findAllForSitemap() {
        const list = await this.prisma.article.findMany({
            where: { published: true },
            select: { slug: true, publishedAt: true, category: { select: { slug: true } } },
        });
        return list.map((a) => ({
            slug: a.slug,
            category_slug: a.category?.slug ?? '',
            updated_at: a.publishedAt.toISOString(),
        }));
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map