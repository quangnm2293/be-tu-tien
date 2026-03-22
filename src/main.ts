import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Fail fast with a clear message if DATABASE_URL is wrong/missing (common on Railway when only local .env was copied).
  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      '[bootstrap] DATABASE_URL is not set. On Railway: Project → PostgreSQL → Connect → copy URL, or Variables → DATABASE_URL = ${{ Postgres.DATABASE_URL }} when linked.',
    );
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
}
bootstrap();
