import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.input';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.input';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<import("./schemas/order.schema").Order>;
    updateOrderDelivery(updateOrderDeliveryDto: UpdateOrderDeliveryDto): Promise<import("./schemas/order.schema").Order>;
    cancelOrder(orderId: string, req: any): Promise<import("./schemas/order.schema").Order>;
    getUserOrders(req: any): Promise<import("./schemas/order.schema").Order[]>;
    getOrder(orderId: string): Promise<import("./schemas/order.schema").Order>;
    getAllOrders(): Promise<import("./schemas/order.schema").Order[]>;
}
