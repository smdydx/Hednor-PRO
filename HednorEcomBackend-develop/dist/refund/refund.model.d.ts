import { Document } from 'mongoose';
export type RefundDocument = Refund & Document;
export declare class Refund {
    orderId: string;
    userId: string;
    reason: string;
    amount: number;
    description: string;
    status: string;
    adminNotes: string;
}
export declare const RefundSchema: import("mongoose").Schema<Refund, import("mongoose").Model<Refund, any, any, any, Document<unknown, any, Refund> & Refund & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Refund, Document<unknown, {}, import("mongoose").FlatRecord<Refund>> & import("mongoose").FlatRecord<Refund> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
