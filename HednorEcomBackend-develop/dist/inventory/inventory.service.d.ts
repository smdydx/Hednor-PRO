import { Model } from 'mongoose';
import { product } from '../product/product.model';
import { DeductStockInput } from './dto/deduct-stock.input';
export declare class InventoryService {
    private productModel;
    constructor(productModel: Model<product>);
    deductStock(items: DeductStockInput[]): Promise<void>;
    restoreStock(items: any[]): Promise<void>;
    getLowStockProducts(threshold?: number): Promise<{
        message: string;
        products: (import("mongoose").Document<unknown, {}, product> & product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        threshold: number;
    }>;
    updateStock(productId: string, newStock: number): Promise<{
        message: string;
        product: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            stock: number;
        };
    }>;
}
