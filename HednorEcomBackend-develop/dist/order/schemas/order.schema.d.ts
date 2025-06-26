import { Document } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class Order {
    orderId: string;
    status: string;
    totalAmount: number;
    coupanId: string[];
    cartId: string;
    paymentId: string;
    userId: string;
    address: string;
    tracking: string;
    cartItems: {
        productId: string;
        quantity: number;
    }[];
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
