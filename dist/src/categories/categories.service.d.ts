import { PrismaService } from '../prisma/prisma.service';
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    created_at: string;
}
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Category[]>;
    findBySlug(slug: string): Promise<Category | null>;
}
