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
exports.RefundController = void 0;
const common_1 = require("@nestjs/common");
const refund_service_1 = require("./refund.service");
const create_refund_input_1 = require("./dto/create-refund.input");
const update_refund_status_input_1 = require("./dto/update-refund-status.input");
let RefundController = class RefundController {
    refundService;
    constructor(refundService) {
        this.refundService = refundService;
    }
    async requestRefund(createRefundInput) {
        return this.refundService.requestRefund(createRefundInput);
    }
    async updateRefundStatus(updateRefundStatusInput) {
        return this.refundService.updateRefundStatus(updateRefundStatusInput);
    }
    async getRefundsByUser(userId) {
        return this.refundService.getRefundsByUser(userId);
    }
};
exports.RefundController = RefundController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_refund_input_1.CreateRefundInput]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "requestRefund", null);
__decorate([
    (0, common_1.Put)('status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_refund_status_input_1.UpdateRefundStatusInput]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "updateRefundStatus", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundController.prototype, "getRefundsByUser", null);
exports.RefundController = RefundController = __decorate([
    (0, common_1.Controller)('refunds'),
    __metadata("design:paramtypes", [refund_service_1.RefundService])
], RefundController);
//# sourceMappingURL=refund.controller.js.map