"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth_schema_1 = require("./schemas/auth.schema");
let AuthService = class AuthService {
    authModel;
    jwtService;
    constructor(authModel, jwtService) {
        this.authModel = authModel;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const { email, password, firstName, lastName } = dto;
        const existingUser = await this.authModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new this.authModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            isVerified: true,
        });
        await user.save();
        const payload = { sub: user._id, email: user.email };
        const access_token = this.jwtService.sign(payload);
        return {
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isVerified: user.isVerified,
            },
            access_token,
        };
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.authModel.findOne({ email }).select('+password');
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isVerified: user.isVerified,
            }
        };
    }
    async forgotPassword(email) {
        const user = await this.authModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetToken = resetTokenHash;
        user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await this.sendResetEmail(email, resetToken);
        return {
            message: 'Password reset token sent to email',
        };
    }
    async resetPassword(token, newPassword) {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await this.authModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: new Date() },
        });
        if (!user) {
            throw new common_1.BadRequestException('Token is invalid or has expired');
        }
        user.password = await bcrypt.hash(newPassword, 12);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return {
            message: 'Password reset successfully',
        };
    }
    async sendResetEmail(email, token) {
        console.log(`Reset token for ${email}: ${token}`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map