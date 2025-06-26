import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: any, req: any): Promise<any>;
    findAll(req: any, page?: string, limit?: string, status?: string): Promise<any>;
    findAllAdmin(page?: string, limit?: string, status?: string): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    updateStatus(id: string, status: string): Promise<any>;
    cancelOrder(id: string, req: any): Promise<import("./schemas/order.schema").Order>;
    trackOrder(trackingNumber: string): Promise<any>;
    confirmPayment(id: string): Promise<any>;
}
