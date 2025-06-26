import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InventoryService } from '../inventory/inventory.service';
import { EmailService } from '../email/email.service';
import { CreateOrderDto } from './dto/create-order.input';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private inventoryService: InventoryService,
    private emailService: EmailService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      // Deduct stock for all items
      await this.inventoryService.deductStock(createOrderDto.cartItems);

      const order = new this.orderModel({
        ...createOrderDto,
        status: 'pending',
      });

      const savedOrder = await order.save();

      // Send order confirmation email
      await this.emailService.sendEmail({
        to: 'customer@example.com', // You should get this from user data
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
    } catch (error) {
      throw new BadRequestException(`Failed to create order: ${error.message}`);
    }
  }

  async updateOrderDelivery(updateOrderDeliveryDto: UpdateOrderDeliveryDto): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId: updateOrderDeliveryDto.orderId });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = updateOrderDeliveryDto.status;
    if (updateOrderDeliveryDto.tracking) {
      order.tracking = updateOrderDeliveryDto.tracking;
    }

    const updatedOrder = await order.save();

    // Send status update email
    await this.emailService.sendEmail({
      to: 'customer@example.com', // You should get this from user data
      subject: 'Order Status Update',
      text: `Your order (${order.orderId}) status has been updated to "${order.status}".`,
      html: `
        <h2>Order Status Update</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>New Status:</strong> ${order.status}</p>
        ${order.tracking 
          ? `<p><strong>Tracking Info:</strong> ${order.tracking}</p>`
          : ''
        }
        <p>Thank you for your patience!</p>
      `,
    });

    return updatedOrder;
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId, userId });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === 'delivered' || order.status === 'shipped') {
      throw new ForbiddenException('Cannot cancel order that has been shipped or delivered');
    }

    order.status = 'cancelled';
    const cancelledOrder = await order.save();

    // Send cancellation email
    await this.emailService.sendEmail({
      to: 'customer@example.com', // You should get this from user data
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

  async findOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  async findOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}