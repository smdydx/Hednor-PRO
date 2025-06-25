import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend communication
  app.enableCors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // ✅ Add global API prefix
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0'); // Bind to 0.0.0.0 for Replit
  console.log('🚀 Backend server running on http://0.0.0.0:4000');
}
bootstrap();