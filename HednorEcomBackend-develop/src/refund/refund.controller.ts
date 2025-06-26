
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RefundService } from './refund.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createRefundDto: any, @Request() req) {
    return this.refundService.create({
      ...createRefundDto,
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
    return this.refundService.findUserRefunds(req.user._id, pageNum, limitNum, status);
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
    return this.refundService.findAllRefunds(pageNum, limitNum, status);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Request() req) {
    return this.refundService.findOne(id, req.user._id);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('adminNotes') adminNotes?: string,
  ) {
    return this.refundService.updateStatus(id, status, adminNotes);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req) {
    return this.refundService.cancelRefund(id, req.user._id);
  }
}
