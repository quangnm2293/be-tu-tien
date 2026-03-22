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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
function resolveDatabaseUrl(config) {
    const url = config.get('DATABASE_URL') ?? process.env.DATABASE_URL;
    if (!url?.trim()) {
        throw new Error('DATABASE_URL is missing. On Railway: add a PostgreSQL service, then set DATABASE_URL to the plugin connection string (Variables → New variable → Reference Postgres, or paste the URL from the Postgres plugin). Do not use localhost inside the deployed container.');
    }
    const isProd = process.env.NODE_ENV === 'production' ||
        process.env.RAILWAY_ENVIRONMENT === 'production' ||
        process.env.RAILWAY_ENVIRONMENT_NAME;
    if (isProd && (url.includes('localhost') || url.includes('127.0.0.1'))) {
        throw new Error('DATABASE_URL points to localhost in production. Railway cannot reach Postgres on localhost inside the API container. Set DATABASE_URL to your Railway PostgreSQL URL (host looks like *.railway.app or a regional hostname), not localhost.');
    }
    return url;
}
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor(config) {
        const url = resolveDatabaseUrl(config);
        super({
            datasources: {
                db: { url },
            },
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connection established');
        }
        catch (e) {
            this.logger.error('Failed to connect to PostgreSQL. Check DATABASE_URL (Railway: use Postgres plugin URL, not localhost).', e instanceof Error ? e.stack : String(e));
            throw e;
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map