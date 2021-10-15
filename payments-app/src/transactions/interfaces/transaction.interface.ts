import { ETransactionStatus } from '../enums/transaction-status.enum';

export interface ITransaction {
  id?: string;
  createdAt: Date;
  status: ETransactionStatus;
  amount: number;
  referenceId: string;
}
