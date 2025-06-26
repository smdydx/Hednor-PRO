import { InventoryService } from './inventory.service';
import { DeductStockInput } from './dto/deduct-stock.input';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    deductStock(items: DeductStockInput[]): Promise<{
        message: string;
    }>;
    restoreStock(items: any[]): Promise<{
        message: string;
    }>;
}
