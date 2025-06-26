import { Model } from 'mongoose';
import { product } from './product.model';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<product>);
    create(productData: any): Promise<product>;
    findAll(page?: number, limit?: number, category?: string, search?: string): Promise<{
        products: (import("mongoose").Document<unknown, {}, product> & product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<product>;
    update(id: string, updateData: any): Promise<product>;
    remove(id: string): Promise<void>;
    getCategories(): Promise<{
        categories: string[];
    }>;
    getFeaturedProducts(): Promise<{
        products: (import("mongoose").Document<unknown, {}, product> & product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    addReview(productId: string, reviewData: any): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, product> & product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getReviews(productId: string): Promise<{
        reviews: {
            rating: number;
            comment: string;
            userName: string;
            createdAt: Date;
        }[];
    }>;
}
