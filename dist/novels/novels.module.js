"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovelsModule = void 0;
const common_1 = require("@nestjs/common");
const novels_controller_1 = require("./novels.controller");
const novels_service_1 = require("./novels.service");
let NovelsModule = class NovelsModule {
};
exports.NovelsModule = NovelsModule;
exports.NovelsModule = NovelsModule = __decorate([
    (0, common_1.Module)({
        controllers: [novels_controller_1.NovelsController],
        providers: [novels_service_1.NovelsService],
        exports: [novels_service_1.NovelsService],
    })
], NovelsModule);
//# sourceMappingURL=novels.module.js.map