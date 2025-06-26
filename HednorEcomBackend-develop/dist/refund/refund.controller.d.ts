import { RefundService } from './refund.service';
export declare class RefundController {
    private readonly refundService;
    constructor(refundService: RefundService);
    create(createRefundDto: any, req: any): Promise<any>;
    findAll(req: any, page?: string, limit?: string, status?: string): Promise<any>;
    findAllAdmin(page?: string, limit?: string, status?: string): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    updateStatus(id: string, status: string, adminNotes?: string): Promise<any>;
    remove(id: string, req: any): Promise<any>;
}
