import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
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
    login(loginAuthDto: LoginAuthDto): Promise<{
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
    getProfile(req: any): Promise<{
        message: string;
        user: any;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
