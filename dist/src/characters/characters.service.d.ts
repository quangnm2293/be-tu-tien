import { PrismaService } from '../prisma/prisma.service';
export interface Character {
    id: string;
    novel_id: string;
    name: string;
    slug: string;
    description: string | null;
    power_rank: number | null;
    avatar_url: string | null;
    created_at: string;
}
export declare class CharactersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByNovelSlug(novelSlug: string): Promise<Character[]>;
    findBySlug(novelSlug: string, characterSlug: string): Promise<Character | null>;
    private toCharacter;
}
