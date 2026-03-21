import { ArticlesService } from '../articles/articles.service';
import { PrismaService } from '../prisma/prisma.service';
export interface GenerateArticleDto {
    type: 'tom-tat-truyen' | 'top-nhan-vat-manh-nhat' | 'he-thong-canh-gioi' | 'nhan-vat' | 'giai-thich-cot-truyen';
    novel_id?: string;
    character_id?: string;
    title?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
}
export declare class GenerateArticleService {
    private prisma;
    private articlesService;
    constructor(prisma: PrismaService, articlesService: ArticlesService);
    generate(dto: GenerateArticleDto): Promise<{
        success: boolean;
        message: string;
        article?: {
            id: string;
            slug: string;
            category_slug: string;
        };
    }>;
    private slugify;
}
