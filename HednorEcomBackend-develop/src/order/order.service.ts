// src/order/order.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';

import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderDeliveryInput } from './dto/update-order-delivery.input';
import { InventoryService } from 'src/inventory/inventory.service';
import { DeductStockInput } from 'src/inventory/dto/deduct-stock.input';
import { EmailService } from 'src/email/email.service';



@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    
    
    private readonly inventoryService: InventoryService,
    private readonly emailService: EmailService,
  
    
  ) {}

  // async createOrder(input: CreateOrderInput): Promise<Order> {
  //   const { userId, cartItems, totalAmount, coupanId, paymentId, cartId} = input;

  //   // ✅ Step 1: Prepare stock deduction input
  //   const stockItems: DeductStockInput[] = cartItems.map(item => ({
  //     productId: item.productId,
  //     quantity: item.quantity,
  //   }));

  //   // ✅ Step 2: Deduct stock from inventory
  //   await this.inventoryService.deductStock(stockItems);

  //   // ✅ Step 3: Create new order
  //   const newOrder = new this.orderModel({
  //     userId,
  //     cartId,
      
  //     paymentId,
  //     totalAmount,
  //     coupanId,
  //     orderId: input.orderId,
  //     address: input.address,
  // tracking: '', // default
  //     status: 'pending', // default
  //     createdAt: new Date(),
      
  //   });

  //   return await newOrder.save();
  // }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const { userId, cartItems, totalAmount, coupanId, paymentId, cartId } = input;
  
    // ✅ Step 1: Prepare stock deduction input
    const stockItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  
    // ✅ Step 2: Deduct stock
    await this.inventoryService.deductStock(stockItems);
  
    // ✅ Step 3: Create the order
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
  
    // ✅ Step 4: Send email (hardcoded email ya input me se lo)
    const customerEmail = 'imranahmad9847@gmail.com'; // 👈 Replace this or take from input.address.email etc.
  
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
  
  

  // async updateOrderDelivery(input: UpdateOrderDeliveryInput): Promise<Order> {
  //   const { orderId, status, tracking } = input;
  
  //   const updateFields: any = {};
  //   if (status) updateFields.status = status;
  //   if (tracking) updateFields.tracking = tracking;
  
  //   const order = await this.orderModel.findOneAndUpdate(
  //     { orderId },
  //     updateFields,
  //     { new: true },
  //   );
  
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }
  
  //   return order;
  // }


  // async cancelOrder(orderId: string, userId: string): Promise<Order> {
  //   // const order = await this.orderModel.findById(orderId);
  //   const order = await this.orderModel.findOne({ orderId }); // 👈 yeh line update ki
  
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }
  
  //   // Check if user owns this order (or is admin)
  //   if (order.userId.toString() !== userId.toString()) {
  //     throw new ForbiddenException('You are not allowed to cancel this order');
  //   }
  
  //   // Allow cancellation only if status is pending or confirmed
  //   if (!['pending', 'confirmed'].includes(order.status)) {
  //     throw new BadRequestException('Order cannot be cancelled at this stage');
  //   }
  
  //   // Update status
  //   order.status = 'cancelled';
  //   await order.save();
  
  //   // Restore inventory
  //   await this.inventoryService.restoreStock(order.items);
  
  //   return order;
  // }


  async updateOrderDelivery(input: UpdateOrderDeliveryInput): Promise<Order> {
    const { orderId, status, tracking } = input;
  
    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (tracking) updateFields.tracking = tracking;
  
    const order = await this.orderModel.findOneAndUpdate(
      { orderId },
      updateFields,
      { new: true },
    );
  
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    // 👇 Send email notification on delivery status update
    // const customerEmail = order.address?.email || 'fallback@example.com'; // Adjust as needed
    const customerEmail = 'imranahmad9847@gmail.com';
    await this.emailService.sendEmail({
      to: customerEmail,
      subject: `Order Update: ${order.status}`,
      text: `Your order (${order.orderId}) status has been updated to "${order.status}".`,
      html: `
        <h2>Your order status has been updated</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>New Status:</strong> ${order.status}</p>
        ${
          order.tracking
            ? `<p><strong>Tracking Info:</strong> ${order.tracking}</p>`
            : ''
        }
        <p>Thank you for shopping with us!</p>
      `,
    });
  
    return order;
  }
  
  
  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId }); // 👈 updated line
  
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    // Check if user owns this order (or is admin)
    if (order.userId.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not allowed to cancel this order');
    }
  
    // Allow cancellation only if status is pending or confirmed
    if (!['pending', 'confirmed'].includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }
  
    // Update status
    order.status = 'cancelled';
    await order.save();
  
    // Restore inventory
    await this.inventoryService.restoreStock(order.items);
  
    // 👇 Send cancellation email
    const customerEmail = 'imranahmad9847@gmail.com';  // replace fallback with appropriate default if needed
    const totalAmount = order.totalAmount || 'N/A'; // If you store totalAmount in order
  
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
  

  
}
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InventoryService } from '../inventory/inventory.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private inventoryService: InventoryService,
    private emailService: EmailService,
  ) {}

  async create(createOrderDto: any) {
    try {
      // Check inventory availability
      await this.inventoryService.deductStock(createOrderDto.items);

      // Generate tracking number
      const trackingNumber = 'TRK' + Date.now() + Math.random().toString(36).substr(2, 9);

      // Calculate total amount
      const totalAmount = createOrderDto.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );

      const order = new this.orderModel({
        ...createOrderDto,
        trackingNumber,
        totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
      });

      const savedOrder = await order.save();

      // Send confirmation email
      await this.emailService.sendOrderConfirmation(
        createOrderDto.userEmail,
        savedOrder.toObject()
      );

      return {
        message: 'Order created successfully',
        order: savedOrder,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create order');
    }
  }

  async findUserOrders(
    userId: string,
    page: number = 1,
    limit: number = 10,
    status?: string
  ) {
    const skip = (page - 1) * limit;
    let query: any = { userId };

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

  async findAllOrders(
    page: number = 1,
    limit: number = 10,
    status?: string
  ) {
    const skip = (page - 1) * limit;
    let query: any = {};

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

  async findOne(id: string, userId?: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Check if user has permission to view this order
    if (userId && order.userId.toString() !== userId) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return { order };
  }

  async updateStatus(id: string, status: string) {
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Send status update email
    await this.emailService.sendOrderStatusUpdate(order.userEmail, order.toObject());

    return {
      message: 'Order status updated successfully',
      order,
    };
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.orderModel.findById(id).exec();
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.userId.toString() !== userId) {
      throw new ForbiddenException('You can only cancel your own orders');
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new BadRequestException('Cannot cancel shipped or delivered orders');
    }

    if (order.status === 'cancelled') {
      throw new BadRequestException('Order is already cancelled');
    }

    // Restore inventory
    await this.inventoryService.restoreStock(order.items);

    order.status = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    return {
      message: 'Order cancelled successfully',
      order,
    };
  }

  async trackOrder(trackingNumber: string) {
    const order = await this.orderModel
      .findOne({ trackingNumber })
      .select('trackingNumber status createdAt updatedAt items totalAmount')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with tracking number ${trackingNumber} not found`);
    }

    return { order };
  }

  async confirmPayment(id: string) {
    const order = await this.orderModel.findById(id).exec();
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.paymentStatus === 'paid') {
      throw new BadRequestException('Payment already confirmed');
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
}
