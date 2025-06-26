
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Auth' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true, unique: true })
  trackingNumber: string;

  @Prop([{
    productId: { type: Types.ObjectId, ref: 'product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }])
  items: Array<{
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ 
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @Prop({ 
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  })
  paymentStatus: string;

  @Prop({ type: Object })
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };

  @Prop({ type: Object })
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Prop()
  paymentMethod: string;

  @Prop()
  shippingMethod: string;

  @Prop()
  shippingCost: number;

  @Prop()
  tax: number;

  @Prop()
  discount: number;

  @Prop()
  notes: string;

  @Prop()
  estimatedDeliveryDate: Date;

  @Prop()
  actualDeliveryDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
