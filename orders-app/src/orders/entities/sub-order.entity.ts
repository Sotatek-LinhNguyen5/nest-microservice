import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class SubOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @ManyToOne(() => Order, (order: Order) => order.items)
  order: Order;

  @OneToOne(() => Product, { cascade: true, eager: true })
  @JoinColumn()
  product: Product;
}
