import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';



@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'MongoDB connected successfully with NestJS 🚀';
  }
}
