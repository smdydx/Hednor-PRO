import { RefundService } from './refund.service';
import { CreateRefundInput } from './dto/create-refund.input';
import { UpdateRefundStatusInput } from './dto/update-refund-status.input';
export declare class RefundController {
    private readonly refundService;
    constructor(refundService: RefundService);
    requestRefund(createRefundInput: CreateRefundInput): Promise<import("./refund.model").Refund>;
    updateRefundStatus(updateRefundStatusInput: UpdateRefundStatusInput): Promise<import("./refund.model").Refund>;
    getRefundsByUser(userId: string): Promise<import("./refund.model").Refund[]>;
}
