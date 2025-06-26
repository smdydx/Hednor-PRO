
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('deduct')
  @UseGuards(AuthGuard('jwt'))
  async deductStock(@Body('items') items: any[]) {
    await this.inventoryService.deductStock(items);
    return { message: 'Stock deducted successfully' };
  }

  @Post('restore')
  @UseGuards(AuthGuard('jwt'))
  async restoreStock(@Body('items') items: any[]) {
    await this.inventoryService.restoreStock(items);
    return { message: 'Stock restored successfully' };
  }

  @Get('low-stock')
  @UseGuards(AuthGuard('jwt'))
  async getLowStockProducts(@Query('threshold') threshold: string = '10') {
    const thresholdNum = parseInt(threshold);
    return this.inventoryService.getLowStockProducts(thresholdNum);
  }

  @Patch('update/:productId')
  @UseGuards(AuthGuard('jwt'))
  async updateStock(
    @Param('productId') productId: string,
    @Body('stock') stock: number,
  ) {
    return this.inventoryService.updateStock(productId, stock);
  }
}
