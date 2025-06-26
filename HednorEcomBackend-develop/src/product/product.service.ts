
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(product.name) private productModel: Model<product>,
  ) {}

  async findAll(): Promise<product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(productData: any): Promise<product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async update(id: string, updateData: any): Promise<product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    ).exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
