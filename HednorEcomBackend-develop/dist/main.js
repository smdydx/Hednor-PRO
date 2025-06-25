"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
    console.log('🚀 Backend server running on http://0.0.0.0:4000');
}
bootstrap();
//# sourceMappingURL=main.js.map