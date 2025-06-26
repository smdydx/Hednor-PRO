import { Controller, Post, Body, Get, Param, Put, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.input';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.input';
import { JwtAuthGuard } from '../auth/jwt.strategy';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    return this.orderService.createOrder({
      ...createOrderDto,
      userId: req.user._id
    });
  }

  @Put('delivery')
  async updateOrderDelivery(@Body() updateOrderDeliveryDto: UpdateOrderDeliveryDto) {
    return this.orderService.updateOrderDelivery(updateOrderDeliveryDto);
  }

  @Put('cancel/:orderId')
  @UseGuards(JwtAuthGuard)
  async cancelOrder(@Param('orderId') orderId: string, @Req() req: any) {
    return this.orderService.cancelOrder(orderId, req.user._id);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Req() req: any) {
    return this.orderService.findOrdersByUser(req.user._id);
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.orderService.findOrderById(orderId);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}