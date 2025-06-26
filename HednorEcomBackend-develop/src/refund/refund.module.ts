// src/refund/refund.module.ts
import { Module } from '@nestjs/common';
import { RefundResolver } from './refund.resolver';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Refund, RefundSchema } from './refund.model';
import { OrderModule } from '../order/order.module'; // Order schema ke liye
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Refund.name, schema: RefundSchema }]),
    OrderModule, // 👈 Order model access karne ke liye
    EmailModule,

  ],
  controllers: [RefundController],
  providers: [RefundResolver, RefundService],
})
export class RefundModule {}