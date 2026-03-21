"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersController = void 0;
const common_1 = require("@nestjs/common");
const characters_service_1 = require("./characters.service");
let CharactersController = class CharactersController {
    constructor(charactersService) {
        this.charactersService = charactersService;
    }
    findByNovel(novelSlug) {
        return this.charactersService.findByNovelSlug(novelSlug);
    }
    findBySlug(novelSlug, characterSlug) {
        return this.charactersService.findBySlug(novelSlug, characterSlug);
    }
};
exports.CharactersController = CharactersController;
__decorate([
    (0, common_1.Get)('novel/:novelSlug'),
    __param(0, (0, common_1.Param)('novelSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharactersController.prototype, "findByNovel", null);
__decorate([
    (0, common_1.Get)('novel/:novelSlug/:characterSlug'),
    __param(0, (0, common_1.Param)('novelSlug')),
    __param(1, (0, common_1.Param)('characterSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CharactersController.prototype, "findBySlug", null);
exports.CharactersController = CharactersController = __decorate([
    (0, common_1.Controller)('characters'),
    __metadata("design:paramtypes", [characters_service_1.CharactersService])
], CharactersController);
//# sourceMappingURL=characters.controller.js.map