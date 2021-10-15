import { Transport } from '@nestjs/microservices';

export const PaymentServiceOptions = (): Record<string, any> => ({
  options: {
    port: process.env.PAYMENT_SERVICE_PORT,
    host: process.env.PAYMENT_SERVICE_HOST,
  },
  transport: Transport.TCP,
});
