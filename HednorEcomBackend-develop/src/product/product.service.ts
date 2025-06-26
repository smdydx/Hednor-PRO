
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(product.name) private productModel: Model<product>,
  ) {}

  async create(productData: any): Promise<product> {
    try {
      const newProduct = new this.productModel(productData);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException('Failed to create product');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string,
  ) {
    const skip = (page - 1) * limit;
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await this.productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const total = await this.productModel.countDocuments(query);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateData: any): Promise<product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
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

  async getCategories() {
    const categories = await this.productModel.distinct('category').exec();
    return { categories };
  }

  async getFeaturedProducts() {
    const products = await this.productModel
      .find({ featured: true })
      .limit(8)
      .exec();
    return { products };
  }

  async addReview(productId: string, reviewData: any) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    product.reviews.push({
      ...reviewData,
      createdAt: new Date(),
    });

    // Calculate average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.averageRating = totalRating / product.reviews.length;

    await product.save();
    return { message: 'Review added successfully', product };
  }

  async getReviews(productId: string) {
    const product = await this.productModel.findById(productId).select('reviews').exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return { reviews: product.reviews || [] };
  }
}
