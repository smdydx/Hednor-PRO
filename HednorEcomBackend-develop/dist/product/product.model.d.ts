import { Document } from 'mongoose';
export type ProductDocument = product & Document;
export declare class product {
    name: string;
    description: string;
    price: number;
    salePrice: number;
    category: string;
    stock: number;
    images: string[];
    featured: boolean;
    averageRating: number;
    totalSales: number;
    reviews: Array<{
        rating: number;
        comment: string;
        userName: string;
        createdAt: Date;
    }>;
    tags: string[];
    specifications: Record<string, any>;
    isActive: boolean;
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
}
export declare const ProductSchema: import("mongoose").Schema<product, import("mongoose").Model<product, any, any, any, Document<unknown, any, product> & product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, product, Document<unknown, {}, import("mongoose").FlatRecord<product>> & import("mongoose").FlatRecord<product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
