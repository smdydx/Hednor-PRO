
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Refund, RefundDocument } from './refund.model';
import { CreateRefundDto } from './dto/create-refund.input';
import { UpdateRefundStatusDto } from './dto/update-refund-status.input';
import { EmailService } from '../email/email.service';

@Injectable()
export class RefundService {
  constructor(
    @InjectModel(Refund.name) private refundModel: Model<RefundDocument>,
    private emailService: EmailService,
  ) {}

  async create(createRefundDto: CreateRefundDto): Promise<Refund> {
    const refund = new this.refundModel({
      ...createRefundDto,
      status: 'pending',
      createdAt: new Date(),
    });

    const savedRefund = await refund.save();

    // Send refund request email
    await this.emailService.sendEmail({
      to: 'customer@example.com',
      subject: 'Refund Request Submitted',
      text: `Your refund request has been submitted and is being processed.`,
      html: `
        <h2>Refund Request Submitted</h2>
        <p><strong>Refund ID:</strong> ${savedRefund._id}</p>
        <p><strong>Order ID:</strong> ${savedRefund.orderId}</p>
        <p><strong>Amount:</strong> $${savedRefund.amount}</p>
        <p>We will process your request within 3-5 business days.</p>
      `,
    });

    return savedRefund;
  }

  async findUserRefunds(userId: string, page = 1, limit = 10, status?: string): Promise<{ refunds: Refund[], total: number }> {
    const query: any = { userId };
    if (status) {
      query.status = status;
    }

    const refunds = await this.refundModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.refundModel.countDocuments(query);

    return { refunds, total };
  }

  async findAllRefunds(page = 1, limit = 10, status?: string): Promise<{ refunds: Refund[], total: number }> {
    const query: any = {};
    if (status) {
      query.status = status;
    }

    const refunds = await this.refundModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.refundModel.countDocuments(query);

    return { refunds, total };
  }

  async findOne(id: string, userId: string): Promise<Refund> {
    const refund = await this.refundModel.findOne({ _id: id, userId });
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }
    return refund;
  }

  async requestRefund(input: any): Promise<Refund> {
    const refund = new this.refundModel({
      ...input,
      status: 'PENDING',
      requestDate: new Date(),
    });
    return await refund.save();
  }

  async updateRefundStatus(input: any): Promise<Refund> {
    const refund = await this.refundModel.findByIdAndUpdate(
      input.refundId,
      { status: input.status, adminNotes: input.adminNotes },
      { new: true }
    ).exec();
    
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }
    
    return refund;
  }

  async getRefundsByUser(userId: string): Promise<Refund[]> {
    return await this.refundModel.find({ userId }).exec();
  }

  async updateStatus(id: string, status: string, adminNotes?: string): Promise<Refund> {
    const refund = await this.refundModel.findById(id);
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }

    refund.status = status;
    if (adminNotes) {
      refund.adminNotes = adminNotes;
    }

    const updatedRefund = await refund.save();

    // Send status update email
    await this.emailService.sendEmail({
      to: 'customer@example.com',
      subject: 'Refund Status Update',
      text: `Your refund request status has been updated to: ${status}`,
      html: `
        <h2>Refund Status Update</h2>
        <p><strong>Refund ID:</strong> ${updatedRefund._id}</p>
        <p><strong>New Status:</strong> ${status}</p>
        ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ''}
      `,
    });

    return updatedRefund;
  }

  async cancelRefund(id: string, userId: string): Promise<Refund> {
    const refund = await this.refundModel.findOne({ _id: id, userId });
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }

    if (refund.status === 'approved' || refund.status === 'processed') {
      throw new BadRequestException('Cannot cancel an approved or processed refund');
    }

    refund.status = 'cancelled';
    return refund.save();
  }
}
