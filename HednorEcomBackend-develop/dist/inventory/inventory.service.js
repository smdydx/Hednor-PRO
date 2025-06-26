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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let InventoryService = class InventoryService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async deductStock(items) {
        for (const item of items) {
            const product = await this.productModel.findById(item.productId);
            if (!product) {
                throw new common_1.BadRequestException(`Product with ID ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product ${product.name}`);
            }
            product.stock -= item.quantity;
            await product.save();
        }
        return 'Stock successfully deducted';
    }
    async checkStock(productId) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.BadRequestException(`Product with ID ${productId} not found`);
        }
        return product.stock;
    }
    async updateStock(productId, quantity) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.BadRequestException(`Product with ID ${productId} not found`);
        }
        product.stock = quantity;
        await product.save();
        return 'Stock updated successfully';
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map