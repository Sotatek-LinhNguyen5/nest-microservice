import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PaymentServiceOptions } from 'src/config/service.config';
import { SubOrder } from './entities/sub-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, SubOrder])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UsersService,
    ProductsService,
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create(PaymentServiceOptions());
      },
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
