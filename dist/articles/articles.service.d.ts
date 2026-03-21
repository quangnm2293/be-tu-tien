import { PrismaService } from '../prisma/prisma.service';
export interface Article {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    category_id: string;
    novel_id: string | null;
    character_id: string | null;
    meta_title: string | null;
    meta_description: string | null;
    featured_image: string | null;
    view_count: number;
    published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
    categories?: {
        name: string;
        slug: string;
    };
    novels?: {
        id?: string;
        title: string;
        slug: string;
        cover_image?: string | null;
    } | null;
    characters?: {
        id: string;
        name: string;
        slug: string;
    } | null;
}
export interface ArticleListItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    view_count: number;
    published_at: string;
    categories?: {
        name: string;
        slug: string;
    };
    novels?: {
        title: string;
        slug: string;
    } | null;
}
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    findLatest(limit?: number): Promise<ArticleListItem[]>;
    findPopular(limit?: number): Promise<ArticleListItem[]>;
    findByCategorySlug(categorySlug: string, limit?: number, offset?: number): Promise<{
        data: ArticleListItem[];
        total: number;
    }>;
    findBySlugAndCategory(categorySlug: string, articleSlug: string): Promise<(Article & {
        related?: ArticleListItem[];
    }) | null>;
    findRelated(articleId: string, novelId: string | null, categoryId: string, limit?: number): Promise<ArticleListItem[]>;
    create(payload: {
        title: string;
        slug: string;
        content: string;
        category_id: string;
        novel_id?: string | null;
        character_id?: string | null;
        meta_title?: string | null;
        meta_description?: string | null;
        published?: boolean;
    }): Promise<Article>;
    findAllForSitemap(): Promise<{
        slug: string;
        category_slug: string;
        updated_at: string;
    }[]>;
}
