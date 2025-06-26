
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(@Body() productData: any) {
    return this.productService.create(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateData: any) {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
