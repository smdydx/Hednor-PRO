
import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundInput } from './dto/create-refund.input';
import { UpdateRefundStatusInput } from './dto/update-refund-status.input';

@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  async requestRefund(@Body() createRefundInput: CreateRefundInput) {
    return this.refundService.requestRefund(createRefundInput);
  }

  @Put('status')
  async updateRefundStatus(@Body() updateRefundStatusInput: UpdateRefundStatusInput) {
    return this.refundService.updateRefundStatus(updateRefundStatusInput);
  }

  @Get('user/:userId')
  async getRefundsByUser(@Param('userId') userId: string) {
    return this.refundService.getRefundsByUser(userId);
  }
}
