import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { EOrderStatus } from './enums/order-status.enum';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { ITransactionResponse } from './interfaces/transaction-response.interface';
import { EventEmitter2 } from 'eventemitter2';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    @Inject('PAYMENT_SERVICE') private paymentClient: ClientProxy,
    private eventEmitter: EventEmitter2,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, items } = createOrderDto;

    const user = await this.usersService.getUserById(userId);

    // const subOrder = items.map(async (item) => {
    //   const product = await this.productsService.getProductById(item.productId);

    //   return {
    //     ...item,
    //     ...product,
    //   };
    // });

    // const amount = subOrder.reduce((total, current) => {
    //   return total + current.quantity * current.price;
    // }, 0);

    // const transaction = await this.pay({});

    const newOrder = this.orderRepository.create({
      status: EOrderStatus.CREATED,
      amount: 100,
      user,
      items: items.map((item) => ({ ...item, amount: 100 })),
    });

    const order = await this.orderRepository.save(newOrder);

    this.eventEmitter.emit('order.created', order);

    // const xxx = {
    //   transactionId: transaction.id,
    //   transactionStatus: transaction.status,
    // };

    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find({
      relations: ['items'],
    });

    return orders;
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['product'],
    });

    return order;
  }

  async cancelOrder(id: string) {
    const order = await this.orderRepository.findOneOrFail(id);
    const { status, ...orderDetail } = order;

    if (status === EOrderStatus.CANCEL || status === EOrderStatus.DELIVERED) {
      throw new HttpException(
        'Can not cancel the order',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.orderRepository.save({
      ...orderDetail,
      status: EOrderStatus.CANCEL,
    });
  }

  private async pay(
    order: Record<string, any>,
  ): Promise<Observable<ITransactionResponse>> {
    return this.paymentClient.send('createTransaction', order);
  }

  @OnEvent('order.created')
  async handleOrderCreatedEvent(order) {
    (await this.pay(order)).subscribe();
  }
}
