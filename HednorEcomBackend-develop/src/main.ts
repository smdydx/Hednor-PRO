import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS here with custom config
  app.enableCors({
    origin: 'http://localhost:3000', // your frontend's URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
