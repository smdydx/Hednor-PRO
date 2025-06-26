
import { Controller, Post, Body, Put, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderDeliveryInput } from './dto/update-order-delivery.input';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Put('delivery')
  async updateOrderDelivery(@Body() updateOrderDeliveryInput: UpdateOrderDeliveryInput) {
    return this.orderService.updateOrderDelivery(updateOrderDeliveryInput);
  }

  @Delete(':orderId/cancel')
  async cancelOrder(
    @Param('orderId') orderId: string,
    @Body('userId') userId: string,
  ) {
    return this.orderService.cancelOrder(orderId, userId);
  }
}
