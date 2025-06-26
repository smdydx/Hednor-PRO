import { Model } from 'mongoose';
import { Refund, RefundDocument } from './refund.model';
import { CreateRefundDto } from './dto/create-refund.input';
import { EmailService } from '../email/email.service';
export declare class RefundService {
    private refundModel;
    private emailService;
    constructor(refundModel: Model<RefundDocument>, emailService: EmailService);
    create(createRefundDto: CreateRefundDto): Promise<Refund>;
    findUserRefunds(userId: string, page?: number, limit?: number, status?: string): Promise<{
        refunds: Refund[];
        total: number;
    }>;
    findAllRefunds(page?: number, limit?: number, status?: string): Promise<{
        refunds: Refund[];
        total: number;
    }>;
    findOne(id: string, userId: string): Promise<Refund>;
    requestRefund(input: any): Promise<Refund>;
    updateRefundStatus(input: any): Promise<Refund>;
    getRefundsByUser(userId: string): Promise<Refund[]>;
    updateStatus(id: string, status: string, adminNotes?: string): Promise<Refund>;
    cancelRefund(id: string, userId: string): Promise<Refund>;
}
