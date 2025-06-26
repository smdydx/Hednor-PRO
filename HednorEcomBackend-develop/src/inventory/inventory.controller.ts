import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { DeductStockDto } from './dto/deduct-stock.input';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('deduct-stock')
  async deductStock(@Body() items: DeductStockDto[]): Promise<{ message: string }> {
    const result = await this.inventoryService.deductStock(items);
    return { message: result };
  }

  @Get('stock/:productId')
  async checkStock(@Param('productId') productId: string): Promise<{ stock: number }> {
    const stock = await this.inventoryService.checkStock(productId);
    return { stock };
  }

  @Put('stock/:productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body() body: { quantity: number }
  ): Promise<{ message: string }> {
    const result = await this.inventoryService.updateStock(productId, body.quantity);
    return { message: result };
  }
}