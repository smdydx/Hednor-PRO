import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop([String])
  coupanId: string[];

  @Prop({ required: true })
  cartId: string;

  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  tracking: string;

  @Prop({ type: [{ productId: String, quantity: Number }] })
  cartItems: { productId: string; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);