
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  async sendEmail(@Body() emailDto: any) {
    return this.emailService.sendEmail(emailDto);
  }
}
