"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:3000', 'https://4ce7a542-f80d-465a-ad2f-19dad5b19695-00-3657na841g50s.sisko.replit.dev', 'http://0.0.0.0:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Backend server running on http://0.0.0.0:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map