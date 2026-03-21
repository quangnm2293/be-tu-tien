import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findLatest(limit?: string): Promise<import("./articles.service").ArticleListItem[]>;
    findPopular(limit?: string): Promise<import("./articles.service").ArticleListItem[]>;
    sitemap(): Promise<{
        slug: string;
        category_slug: string;
        updated_at: string;
    }[]>;
    findByCategory(categorySlug: string, limit?: string, offset?: string): Promise<{
        data: import("./articles.service").ArticleListItem[];
        total: number;
    }>;
    findBySlugAndCategory(categorySlug: string, articleSlug: string): Promise<(import("./articles.service").Article & {
        related?: import("./articles.service").ArticleListItem[];
    }) | null>;
}
