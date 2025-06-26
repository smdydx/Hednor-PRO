
export class CreateRefundDto {
  orderId: string;
  reason: string;
  amount: number;
  description?: string;
}
