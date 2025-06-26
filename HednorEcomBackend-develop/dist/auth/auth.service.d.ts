import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthDocument } from './schemas/auth.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private authModel;
    private jwtService;
    constructor(authModel: Model<AuthDocument>, jwtService: JwtService);
    signup(dto: CreateAuthDto): Promise<{
        message: string;
        user: {
            id: unknown;
            email: string;
            firstName: string;
            lastName: string;
            isVerified: boolean;
        };
        access_token: string;
    }>;
    login(dto: LoginAuthDto): Promise<{
        message: string;
        token: string;
        user: {
            id: unknown;
            email: string;
            firstName: string;
            lastName: string;
            isVerified: boolean;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private sendResetEmail;
}
