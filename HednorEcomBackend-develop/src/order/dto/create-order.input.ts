import { DeductStockDto } from "../../inventory/dto/deduct-stock.input";

export class CreateOrderDto {
  orderId: string;
  status: string;
  totalAmount: number;
  coupanId?: string[];
  cartId: string;
  paymentId: string;
  userId: string;
  address: string;
  cartItems: DeductStockDto[];
}