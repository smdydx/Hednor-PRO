import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(emailDto: any): Promise<{
        message: string;
    }>;
}
