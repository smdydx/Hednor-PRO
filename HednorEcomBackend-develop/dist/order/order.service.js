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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const inventory_service_1 = require("../inventory/inventory.service");
const email_service_1 = require("../email/email.service");
let OrderService = class OrderService {
    orderModel;
    inventoryService;
    emailService;
    constructor(orderModel, inventoryService, emailService) {
        this.orderModel = orderModel;
        this.inventoryService = inventoryService;
        this.emailService = emailService;
    }
    async createOrder(createOrderDto) {
        try {
            await this.inventoryService.deductStock(createOrderDto.cartItems);
            const order = new this.orderModel({
                ...createOrderDto,
                status: 'pending',
            });
            const savedOrder = await order.save();
            await this.emailService.sendEmail({
                to: 'customer@example.com',
                subject: 'Order Confirmation',
                text: `Your order (${savedOrder.orderId}) has been placed successfully.`,
                html: `
          <h2>Order Confirmation</h2>
          <p><strong>Order ID:</strong> ${savedOrder.orderId}</p>
          <p><strong>Total Amount:</strong> $${savedOrder.totalAmount}</p>
          <p><strong>Status:</strong> ${savedOrder.status}</p>
          <p>Thank you for your order!</p>
        `,
            });
            return savedOrder;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create order: ${error.message}`);
        }
    }
    async updateOrderDelivery(updateOrderDeliveryDto) {
        const order = await this.orderModel.findOne({ orderId: updateOrderDeliveryDto.orderId });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        order.status = updateOrderDeliveryDto.status;
        if (updateOrderDeliveryDto.tracking) {
            order.tracking = updateOrderDeliveryDto.tracking;
        }
        const updatedOrder = await order.save();
        await this.emailService.sendEmail({
            to: 'customer@example.com',
            subject: 'Order Status Update',
            text: `Your order (${order.orderId}) status has been updated to "${order.status}".`,
            html: `
        <h2>Order Status Update</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>New Status:</strong> ${order.status}</p>
        ${order.tracking
                ? `<p><strong>Tracking Info:</strong> ${order.tracking}</p>`
                : ''}
        <p>Thank you for your patience!</p>
      `,
        });
        return updatedOrder;
    }
    async cancelOrder(orderId, userId) {
        const order = await this.orderModel.findOne({ orderId, userId });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.status === 'delivered' || order.status === 'shipped') {
            throw new common_1.ForbiddenException('Cannot cancel order that has been shipped or delivered');
        }
        order.status = 'cancelled';
        const cancelledOrder = await order.save();
        await this.emailService.sendEmail({
            to: 'customer@example.com',
            subject: 'Order Cancelled',
            text: `Your order (${order.orderId}) has been cancelled.`,
            html: `
        <h2>Order Cancelled</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p>Your order has been successfully cancelled.</p>
        <p>If you have any questions, please contact our support team.</p>
      `,
        });
        return cancelledOrder;
    }
    async findOrdersByUser(userId) {
        return this.orderModel.find({ userId }).exec();
    }
    async findOrderById(orderId) {
        const order = await this.orderModel.findOne({ orderId });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async getAllOrders() {
        return this.orderModel.find().exec();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        inventory_service_1.InventoryService,
        email_service_1.EmailService])
], OrderService);
//# sourceMappingURL=order.service.js.map