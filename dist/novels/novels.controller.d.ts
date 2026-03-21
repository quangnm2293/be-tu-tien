import { NovelsService } from './novels.service';
export declare class NovelsController {
    private readonly novelsService;
    constructor(novelsService: NovelsService);
    findAll(): Promise<import("./novels.service").Novel[]>;
    findTrending(): Promise<import("./novels.service").Novel[]>;
    findBySlug(slug: string): Promise<import("./novels.service").Novel | null>;
    create(body: Record<string, unknown>): Promise<import("./novels.service").Novel>;
}
