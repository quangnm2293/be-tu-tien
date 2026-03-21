import { GenerateArticleService, GenerateArticleDto } from './generate-article.service';
export declare class GenerateArticleController {
    private readonly generateArticleService;
    constructor(generateArticleService: GenerateArticleService);
    generate(dto: GenerateArticleDto): Promise<{
        success: boolean;
        message: string;
        article?: {
            id: string;
            slug: string;
            category_slug: string;
        };
    }>;
}
