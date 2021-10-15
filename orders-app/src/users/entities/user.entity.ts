import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Unique(['email'])
  @Column()
  public email: string;

  @Column()
  public name: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToMany(() => Order, (order: Order) => order.id)
  public orders: Order[];
}
