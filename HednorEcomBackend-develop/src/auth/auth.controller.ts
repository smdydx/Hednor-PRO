
import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      console.log('=== REGISTER ENDPOINT HIT ===');
      console.log('Request body:', JSON.stringify(createAuthDto, null, 2));
      console.log('Email:', createAuthDto.email);
      console.log('FirstName:', createAuthDto.firstName);
      console.log('LastName:', createAuthDto.lastName);
      
      const result = await this.authService.signup(createAuthDto);
      console.log('Registration successful for:', createAuthDto.email);
      return result;
    } catch (error) {
      console.error('Registration failed for:', createAuthDto.email);
      console.error('Error:', error.message);
      console.error('Stack:', error.stack);
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    return {
      message: 'Profile retrieved successfully',
      user: req.user
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout() {
    return {
      message: 'Logged out successfully'
    };
  }
}
