import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class Order {
    userId: Types.ObjectId;
    userEmail: string;
    trackingNumber: string;
    items: Array<{
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        image?: string;
    }>;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    billingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    shippingMethod: string;
    shippingCost: number;
    tax: number;
    discount: number;
    notes: string;
    estimatedDeliveryDate: Date;
    actualDeliveryDate: Date;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
