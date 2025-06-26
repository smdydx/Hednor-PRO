import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: any): Promise<import("./product.model").product>;
    findAll(page?: string, limit?: string, category?: string, search?: string): Promise<{
        products: (import("mongoose").Document<unknown, {}, import("./product.model").product> & import("./product.model").product & {
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
    getCategories(): Promise<{
        categories: string[];
    }>;
    getFeaturedProducts(): Promise<{
        products: (import("mongoose").Document<unknown, {}, import("./product.model").product> & import("./product.model").product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("./product.model").product>;
    update(id: string, updateProductDto: any): Promise<import("./product.model").product>;
    remove(id: string): Promise<void>;
    addReview(id: string, reviewDto: any): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, import("./product.model").product> & import("./product.model").product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getReviews(id: string): Promise<{
        reviews: {
            rating: number;
            comment: string;
            userName: string;
            createdAt: Date;
        }[];
    }>;
}
