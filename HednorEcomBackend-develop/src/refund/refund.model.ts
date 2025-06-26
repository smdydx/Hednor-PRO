
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefundDocument = Refund & Document;

@Schema({ timestamps: true })
export class Refund {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  adminNotes: string;
}

export const RefundSchema = SchemaFactory.createForClass(Refund);
