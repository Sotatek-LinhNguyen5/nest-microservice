import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { ETransactionStatus } from './enums/transaction-status.enum';
import { ITransactionResponse } from './interfaces/transaction-response.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<ITransactionResponse> {
    const randomValues = [...Object.values(ETransactionStatus)];
    const status =
      randomValues[Math.floor(Math.random() * randomValues.length)];

    const transaction = await this.transactionsRepository.save({
      ...createTransactionDto,
      status,
    });

    return {
      id: transaction.id,
      status: status,
    };
  }
}
