import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

function resolveDatabaseUrl(config: ConfigService): string {
  const url = config.get<string>('DATABASE_URL') ?? process.env.DATABASE_URL;
  if (!url?.trim()) {
    throw new Error(
      'DATABASE_URL is missing. On Railway: add a PostgreSQL service, then set DATABASE_URL to the plugin connection string (Variables → New variable → Reference Postgres, or paste the URL from the Postgres plugin). Do not use localhost inside the deployed container.',
    );
  }
  const isProd =
    process.env.NODE_ENV === 'production' ||
    process.env.RAILWAY_ENVIRONMENT === 'production' ||
    process.env.RAILWAY_ENVIRONMENT_NAME;
  if (isProd && (url.includes('localhost') || url.includes('127.0.0.1'))) {
    throw new Error(
      'DATABASE_URL points to localhost in production. Railway cannot reach Postgres on localhost inside the API container. Set DATABASE_URL to your Railway PostgreSQL URL (host looks like *.railway.app or a regional hostname), not localhost.',
    );
  }
  return url;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService) {
    const url = resolveDatabaseUrl(config);
    super({
      datasources: {
        db: { url },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connection established');
    } catch (e) {
      this.logger.error(
        'Failed to connect to PostgreSQL. Check DATABASE_URL (Railway: use Postgres plugin URL, not localhost).',
        e instanceof Error ? e.stack : String(e),
      );
      throw e;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
