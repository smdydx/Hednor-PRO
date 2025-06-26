
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = product & Document;

@Schema({ timestamps: true })
export class product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  salePrice: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop([String])
  images: string[];

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  totalSales: number;

  @Prop([{
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }])
  reviews: Array<{
    rating: number;
    comment: string;
    userName: string;
    createdAt: Date;
  }>;

  @Prop([String])
  tags: string[];

  @Prop({ type: Object })
  specifications: Record<string, any>;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  brand: string;

  @Prop()
  sku: string;

  @Prop({ default: 0 })
  weight: number;

  @Prop({ type: Object })
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(product);
