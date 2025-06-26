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
exports.RefundService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const refund_model_1 = require("./refund.model");
const email_service_1 = require("../email/email.service");
let RefundService = class RefundService {
    refundModel;
    emailService;
    constructor(refundModel, emailService) {
        this.refundModel = refundModel;
        this.emailService = emailService;
    }
    async create(createRefundDto) {
        const refund = new this.refundModel({
            ...createRefundDto,
            status: 'pending',
            createdAt: new Date(),
        });
        const savedRefund = await refund.save();
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
    async findUserRefunds(userId, page = 1, limit = 10, status) {
        const query = { userId };
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
    async findAllRefunds(page = 1, limit = 10, status) {
        const query = {};
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
    async findOne(id, userId) {
        const refund = await this.refundModel.findOne({ _id: id, userId });
        if (!refund) {
            throw new common_1.NotFoundException('Refund not found');
        }
        return refund;
    }
    async requestRefund(input) {
        const refund = new this.refundModel({
            ...input,
            status: 'PENDING',
            requestDate: new Date(),
        });
        return await refund.save();
    }
    async updateRefundStatus(input) {
        const refund = await this.refundModel.findByIdAndUpdate(input.refundId, { status: input.status, adminNotes: input.adminNotes }, { new: true }).exec();
        if (!refund) {
            throw new common_1.NotFoundException('Refund not found');
        }
        return refund;
    }
    async getRefundsByUser(userId) {
        return await this.refundModel.find({ userId }).exec();
    }
    async updateStatus(id, status, adminNotes) {
        const refund = await this.refundModel.findById(id);
        if (!refund) {
            throw new common_1.NotFoundException('Refund not found');
        }
        refund.status = status;
        if (adminNotes) {
            refund.adminNotes = adminNotes;
        }
        const updatedRefund = await refund.save();
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
    async cancelRefund(id, userId) {
        const refund = await this.refundModel.findOne({ _id: id, userId });
        if (!refund) {
            throw new common_1.NotFoundException('Refund not found');
        }
        if (refund.status === 'approved' || refund.status === 'processed') {
            throw new common_1.BadRequestException('Cannot cancel an approved or processed refund');
        }
        refund.status = 'cancelled';
        return refund.save();
    }
};
exports.RefundService = RefundService;
exports.RefundService = RefundService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(refund_model_1.Refund.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], RefundService);
//# sourceMappingURL=refund.service.js.map