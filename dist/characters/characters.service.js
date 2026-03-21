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
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CharactersService = class CharactersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByNovelSlug(novelSlug) {
        const novel = await this.prisma.novel.findUnique({
            where: { slug: novelSlug },
            select: { id: true },
        });
        if (!novel)
            return [];
        const list = await this.prisma.character.findMany({
            where: { novelId: novel.id },
            orderBy: { powerRank: 'asc' },
        });
        return list.map((c) => this.toCharacter(c));
    }
    async findBySlug(novelSlug, characterSlug) {
        const novel = await this.prisma.novel.findUnique({
            where: { slug: novelSlug },
            select: { id: true },
        });
        if (!novel)
            return null;
        const c = await this.prisma.character.findUnique({
            where: { novelId_slug: { novelId: novel.id, slug: characterSlug } },
        });
        return c ? this.toCharacter(c) : null;
    }
    toCharacter(c) {
        return {
            id: c.id,
            novel_id: c.novelId,
            name: c.name,
            slug: c.slug,
            description: c.description,
            power_rank: c.powerRank,
            avatar_url: c.avatarUrl,
            created_at: c.createdAt.toISOString(),
        };
    }
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CharactersService);
//# sourceMappingURL=characters.service.js.map