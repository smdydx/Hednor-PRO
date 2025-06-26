import { RefundService } from './refund.service';
export declare class RefundController {
    private readonly refundService;
    constructor(refundService: RefundService);
    create(createRefundDto: any, req: any): Promise<import("./refund.model").Refund>;
    findAll(req: any, page?: string, limit?: string, status?: string): Promise<{
        refunds: import("./refund.model").Refund[];
        total: number;
    }>;
    findAllAdmin(page?: string, limit?: string, status?: string): Promise<{
        refunds: import("./refund.model").Refund[];
        total: number;
    }>;
    findOne(id: string, req: any): Promise<import("./refund.model").Refund>;
    updateStatus(id: string, status: string, adminNotes?: string): Promise<import("./refund.model").Refund>;
    remove(id: string, req: any): Promise<import("./refund.model").Refund>;
}
