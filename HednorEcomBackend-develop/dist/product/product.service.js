"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_model_1 = require("./product.model");
let ProductService = class ProductService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(productData) {
        try {
            const newProduct = new this.productModel(productData);
            return await newProduct.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create product');
        }
    }
    async findAll(page = 1, limit = 10, category, search) {
        const skip = (page - 1) * limit;
        let query = {};
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
    async findOne(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateData) {
        const updatedProduct = await this.productModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!updatedProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
    }
    async remove(id) {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
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
    async addReview(productId, reviewData) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (!product.reviews) {
            product.reviews = [];
        }
        product.reviews.push({
            ...reviewData,
            createdAt: new Date(),
        });
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        product.averageRating = totalRating / product.reviews.length;
        await product.save();
        return { message: 'Review added successfully', product };
    }
    async getReviews(productId) {
        const product = await this.productModel.findById(productId).select('reviews').exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        return { reviews: product.reviews || [] };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_model_1.product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map