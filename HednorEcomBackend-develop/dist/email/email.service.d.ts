export declare class EmailService {
    sendOrderConfirmation(email: string, order: any): Promise<{
        message: string;
    }>;
    sendOrderStatusUpdate(email: string, order: any): Promise<{
        message: string;
    }>;
    sendEmail(emailDto: any): Promise<{
        message: string;
    }>;
}
