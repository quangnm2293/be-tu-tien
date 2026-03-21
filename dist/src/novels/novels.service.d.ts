import { PrismaService } from '../prisma/prisma.service';
export interface Novel {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    author_name: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}
export declare class NovelsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(limit?: number): Promise<Novel[]>;
    findTrending(limit?: number): Promise<Novel[]>;
    findBySlug(slug: string): Promise<Novel | null>;
    create(payload: Partial<Novel>): Promise<Novel>;
    private toNovel;
}
