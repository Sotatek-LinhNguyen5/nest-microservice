import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EOrderStatus } from '../enums/order-status.enum';
import { SubOrder } from './sub-order.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  status: EOrderStatus;

  @Column()
  amount: number;

  @Column({
    nullable: true,
  })
  transactionId: number;

  @Column({
    nullable: true,
  })
  transactionStatus: string;

  @CreateDateColumn({
    nullable: true,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @OneToMany(() => SubOrder, (subOrder: SubOrder) => subOrder.order, {
    cascade: true,
  })
  items: SubOrder[];
}
