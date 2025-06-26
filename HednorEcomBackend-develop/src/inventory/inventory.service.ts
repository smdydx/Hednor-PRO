import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/product.model';
import { DeductStockDto } from './dto/deduct-stock.input';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async deductStock(items: DeductStockDto[]): Promise<string> {
    for (const item of items) {
      const product = await this.productModel.findById(item.productId);
      if (!product) {
        throw new BadRequestException(`Product with ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product ${product.name}`);
      }
      product.stock -= item.quantity;
      await product.save();
    }
    return 'Stock successfully deducted';
  }

  async checkStock(productId: string): Promise<number> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }
    return product.stock;
  }

  async updateStock(productId: string, quantity: number): Promise<string> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }
    product.stock = quantity;
    await product.save();
    return 'Stock updated successfully';
  }
}