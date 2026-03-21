import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("./categories.service").Category[]>;
    findBySlug(slug: string): Promise<import("./categories.service").Category | null>;
}
