
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: any, @Request() req) {
    return this.orderService.create({
      ...createOrderDto,
      userId: req.user._id,
      userEmail: req.user.email,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    return this.orderService.findUserOrders(req.user._id, pageNum, limitNum, status);
  }

  @Get('admin/all')
  @UseGuards(AuthGuard('jwt'))
  async findAllAdmin(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    return this.orderService.findAllOrders(pageNum, limitNum, status);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Request() req) {
    return this.orderService.findOne(id, req.user._id);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateStatus(id, status);
  }

  @Patch(':id/cancel')
  @UseGuards(AuthGuard('jwt'))
  async cancelOrder(@Param('id') id: string, @Request() req) {
    return this.orderService.cancelOrder(id, req.user._id);
  }

  @Get('tracking/:trackingNumber')
  async trackOrder(@Param('trackingNumber') trackingNumber: string) {
    return this.orderService.trackOrder(trackingNumber);
  }

  @Post(':id/payment/confirm')
  @UseGuards(AuthGuard('jwt'))
  async confirmPayment(@Param('id') id: string) {
    return this.orderService.confirmPayment(id);
  }
}
