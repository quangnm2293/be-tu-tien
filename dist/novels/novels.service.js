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
exports.NovelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NovelsService = class NovelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = 50) {
        const list = await this.prisma.novel.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return list.map((n) => this.toNovel(n));
    }
    async findTrending(limit = 10) {
        const list = await this.prisma.novel.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return list.map((n) => this.toNovel(n));
    }
    async findBySlug(slug) {
        const n = await this.prisma.novel.findUnique({ where: { slug } });
        return n ? this.toNovel(n) : null;
    }
    async create(payload) {
        const n = await this.prisma.novel.create({
            data: {
                title: payload.title,
                slug: payload.slug,
                description: payload.description ?? undefined,
                coverImage: payload.cover_image ?? undefined,
                authorName: payload.author_name ?? undefined,
                status: payload.status ?? 'completed',
            },
        });
        return this.toNovel(n);
    }
    toNovel(n) {
        return {
            id: n.id,
            title: n.title,
            slug: n.slug,
            description: n.description,
            cover_image: n.coverImage,
            author_name: n.authorName,
            status: n.status,
            created_at: n.createdAt.toISOString(),
            updated_at: n.updatedAt.toISOString(),
        };
    }
};
exports.NovelsService = NovelsService;
exports.NovelsService = NovelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NovelsService);
//# sourceMappingURL=novels.service.js.map