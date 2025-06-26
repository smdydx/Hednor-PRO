import { Model } from 'mongoose';
import { Product } from '../product/product.model';
import { DeductStockDto } from './dto/deduct-stock.input';
export declare class InventoryService {
    private productModel;
    constructor(productModel: Model<Product>);
    deductStock(items: DeductStockDto[]): Promise<string>;
    checkStock(productId: string): Promise<number>;
    updateStock(productId: string, quantity: number): Promise<string>;
}
