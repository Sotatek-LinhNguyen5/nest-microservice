import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETransactionStatus } from '../enums/transaction-status.enum';
import { ITransaction } from '../interfaces/transaction.interface';

@Entity()
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    nullable: true,
  })
  createdAt: Date;

  @Column()
  status: ETransactionStatus;

  @Column()
  amount: number;

  @Column()
  referenceId: string;
}
