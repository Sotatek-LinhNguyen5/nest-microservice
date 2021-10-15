import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ITransactionResponse } from './interfaces/transaction-response.interface';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @MessagePattern('createTransaction')
  async createTransaction(
    @Payload() createTransactionDto: CreateTransactionDto,
  ): Promise<ITransactionResponse> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }
}
