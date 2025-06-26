import { InventoryService } from './inventory.service';
import { DeductStockDto } from './dto/deduct-stock.input';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    deductStock(items: DeductStockDto[]): Promise<{
        message: string;
    }>;
    checkStock(productId: string): Promise<{
        stock: number;
    }>;
    updateStock(productId: string, body: {
        quantity: number;
    }): Promise<{
        message: string;
    }>;
}
