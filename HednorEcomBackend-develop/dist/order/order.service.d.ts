import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InventoryService } from '../inventory/inventory.service';
import { EmailService } from '../email/email.service';
import { CreateOrderDto } from './dto/create-order.input';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.input';
export declare class OrderService {
    private orderModel;
    private inventoryService;
    private emailService;
    constructor(orderModel: Model<OrderDocument>, inventoryService: InventoryService, emailService: EmailService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    updateOrderDelivery(updateOrderDeliveryDto: UpdateOrderDeliveryDto): Promise<Order>;
    cancelOrder(orderId: string, userId: string): Promise<Order>;
    findOrdersByUser(userId: string): Promise<Order[]>;
    findOrderById(orderId: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
}
