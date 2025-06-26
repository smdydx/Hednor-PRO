
import { Controller, Post, Body, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { DeductStockInput } from './dto/deduct-stock.input';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('deduct-stock')
  async deductStock(@Body() items: DeductStockInput[]) {
    await this.inventoryService.deductStock(items);
    return { message: 'Stock deducted successfully' };
  }

  @Put('restore-stock')
  async restoreStock(@Body() items: any[]) {
    await this.inventoryService.restoreStock(items);
    return { message: 'Stock restored successfully' };
  }
}
