import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    deductStock(items: any[]): Promise<{
        message: string;
    }>;
    restoreStock(items: any[]): Promise<{
        message: string;
    }>;
    getLowStockProducts(threshold?: string): Promise<{
        message: string;
        products: (import("mongoose").Document<unknown, {}, import("../product/product.model").product> & import("../product/product.model").product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        threshold: number;
    }>;
    updateStock(productId: string, stock: number): Promise<{
        message: string;
        product: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            stock: number;
        };
    }>;
}
