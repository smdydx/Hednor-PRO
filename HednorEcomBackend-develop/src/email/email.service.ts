import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendOrderConfirmation(email: string, order: any) {
    // In production, implement actual email sending with services like SendGrid, Nodemailer, etc.
    console.log(`📧 Order confirmation email sent to ${email}`);
    console.log(`Order ID: ${order._id}, Tracking: ${order.trackingNumber}`);
    return { message: 'Order confirmation email sent' };
  }

  async sendOrderStatusUpdate(email: string, order: any) {
    console.log(`📧 Order status update email sent to ${email}`);
    console.log(`Order ${order.trackingNumber} status updated to: ${order.status}`);
    return { message: 'Order status update email sent' };
  }

  async sendEmail(emailDto: any) {
    console.log(`📧 Email sent to ${emailDto.to}`);
    console.log(`Subject: ${emailDto.subject}`);
    return { message: 'Email sent successfully' };
  }
}