import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderDeliveryInput } from './dto/update-order-delivery.input';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderInput: CreateOrderInput): Promise<import("./schemas/order.schema").Order>;
    updateOrderDelivery(updateOrderDeliveryInput: UpdateOrderDeliveryInput): Promise<import("./schemas/order.schema").Order>;
    cancelOrder(orderId: string, userId: string): Promise<import("./schemas/order.schema").Order>;
}
