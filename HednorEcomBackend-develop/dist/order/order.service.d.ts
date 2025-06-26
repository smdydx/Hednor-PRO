import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderDeliveryInput } from './dto/update-order-delivery.input';
import { InventoryService } from 'src/inventory/inventory.service';
import { EmailService } from 'src/email/email.service';
export declare class OrderService {
    private orderModel;
    private readonly inventoryService;
    private readonly emailService;
    constructor(orderModel: Model<Order>, inventoryService: InventoryService, emailService: EmailService);
    createOrder(input: CreateOrderInput): Promise<Order>;
    updateOrderDelivery(input: UpdateOrderDeliveryInput): Promise<Order>;
    cancelOrder(orderId: string, userId: string): Promise<Order>;
}
export declare class OrderService {
    private orderModel;
    private inventoryService;
    private emailService;
    constructor(orderModel: Model<OrderDocument>, inventoryService: InventoryService, emailService: EmailService);
    create(createOrderDto: any): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findUserOrders(userId: string, page?: number, limit?: number, status?: string): Promise<{
        orders: (import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAllOrders(page?: number, limit?: number, status?: string): Promise<{
        orders: (import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, userId?: string): Promise<{
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateStatus(id: string, status: string): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    cancelOrder(id: string, userId: string): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    trackOrder(trackingNumber: string): Promise<{
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    confirmPayment(id: string): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
