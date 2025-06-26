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
const order_schema_1 = require("./schemas/order.schema");
const mongoose_2 = require("mongoose");
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
    async createOrder(input) {
        const { userId, cartItems, totalAmount, coupanId, paymentId, cartId } = input;
        const stockItems = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        await this.inventoryService.deductStock(stockItems);
        const newOrder = new this.orderModel({
            userId,
            cartId,
            paymentId,
            totalAmount,
            coupanId,
            orderId: input.orderId,
            address: input.address,
            tracking: '',
            status: 'pending',
            createdAt: new Date(),
        });
        const savedOrder = await newOrder.save();
        const customerEmail = 'imranahmad9847@gmail.com';
        await this.emailService.sendEmail({
            to: customerEmail,
            subject: 'Order Confirmation',
            text: `Your order (${input.orderId}) has been placed successfully.`,
            html: `
        <h2>Thanks for your order!</h2>
        <p><strong>Order ID:</strong> ${input.orderId}</p>
        <p><strong>Total:</strong> ₹${totalAmount}</p>
      `,
        });
        return savedOrder;
    }
    async updateOrderDelivery(input) {
        const { orderId, status, tracking } = input;
        const updateFields = {};
        if (status)
            updateFields.status = status;
        if (tracking)
            updateFields.tracking = tracking;
        const order = await this.orderModel.findOneAndUpdate({ orderId }, updateFields, { new: true });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const customerEmail = 'imranahmad9847@gmail.com';
        await this.emailService.sendEmail({
            to: customerEmail,
            subject: `Order Update: ${order.status}`,
            text: `Your order (${order.orderId}) status has been updated to "${order.status}".`,
            html: `
        <h2>Your order status has been updated</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>New Status:</strong> ${order.status}</p>
        ${order.tracking
                ? `<p><strong>Tracking Info:</strong> ${order.tracking}</p>`
                : ''}
        <p>Thank you for shopping with us!</p>
      `,
        });
        return order;
    }
    async cancelOrder(orderId, userId) {
        const order = await this.orderModel.findOne({ orderId });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId.toString() !== userId.toString()) {
            throw new common_1.ForbiddenException('You are not allowed to cancel this order');
        }
        if (!['pending', 'confirmed'].includes(order.status)) {
            throw new common_1.BadRequestException('Order cannot be cancelled at this stage');
        }
        order.status = 'cancelled';
        await order.save();
        await this.inventoryService.restoreStock(order.items);
        const customerEmail = 'imranahmad9847@gmail.com';
        const totalAmount = order.totalAmount || 'N/A';
        await this.emailService.sendEmail({
            to: customerEmail,
            subject: 'Order Cancellation',
            text: `Your order (${order.orderId}) has been cancelled.`,
            html: `
        <h2>Your order has been cancelled</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Total:</strong> ₹${totalAmount}</p>
        <p>We're sorry to see you cancel. If you have any questions, feel free to contact support.</p>
      `,
        });
        return order;
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
let OrderService = class OrderService {
    orderModel;
    inventoryService;
    emailService;
    constructor(orderModel, inventoryService, emailService) {
        this.orderModel = orderModel;
        this.inventoryService = inventoryService;
        this.emailService = emailService;
    }
    async create(createOrderDto) {
        try {
            await this.inventoryService.deductStock(createOrderDto.items);
            const trackingNumber = 'TRK' + Date.now() + Math.random().toString(36).substr(2, 9);
            const totalAmount = createOrderDto.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            const order = new this.orderModel({
                ...createOrderDto,
                trackingNumber,
                totalAmount,
                status: 'pending',
                paymentStatus: 'pending',
            });
            const savedOrder = await order.save();
            await this.emailService.sendOrderConfirmation(createOrderDto.userEmail, savedOrder.toObject());
            return {
                message: 'Order created successfully',
                order: savedOrder,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to create order');
        }
    }
    async findUserOrders(userId, page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        let query = { userId };
        if (status) {
            query.status = status;
        }
        const orders = await this.orderModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
        const total = await this.orderModel.countDocuments(query);
        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findAllOrders(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        let query = {};
        if (status) {
            query.status = status;
        }
        const orders = await this.orderModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
        const total = await this.orderModel.countDocuments(query);
        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userId && order.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('You can only view your own orders');
        }
        return { order };
    }
    async updateStatus(id, status) {
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException('Invalid status');
        }
        const order = await this.orderModel.findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true }).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        await this.emailService.sendOrderStatusUpdate(order.userEmail, order.toObject());
        return {
            message: 'Order status updated successfully',
            order,
        };
    }
    async cancelOrder(id, userId) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own orders');
        }
        if (order.status === 'shipped' || order.status === 'delivered') {
            throw new common_1.BadRequestException('Cannot cancel shipped or delivered orders');
        }
        if (order.status === 'cancelled') {
            throw new common_1.BadRequestException('Order is already cancelled');
        }
        await this.inventoryService.restoreStock(order.items);
        order.status = 'cancelled';
        order.updatedAt = new Date();
        await order.save();
        return {
            message: 'Order cancelled successfully',
            order,
        };
    }
    async trackOrder(trackingNumber) {
        const order = await this.orderModel
            .findOne({ trackingNumber })
            .select('trackingNumber status createdAt updatedAt items totalAmount')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with tracking number ${trackingNumber} not found`);
        }
        return { order };
    }
    async confirmPayment(id) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.paymentStatus === 'paid') {
            throw new common_1.BadRequestException('Payment already confirmed');
        }
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        order.updatedAt = new Date();
        await order.save();
        return {
            message: 'Payment confirmed successfully',
            order,
        };
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