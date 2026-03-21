import { CharactersService } from './characters.service';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    findByNovel(novelSlug: string): Promise<import("./characters.service").Character[]>;
    findBySlug(novelSlug: string, characterSlug: string): Promise<import("./characters.service").Character | null>;
}
