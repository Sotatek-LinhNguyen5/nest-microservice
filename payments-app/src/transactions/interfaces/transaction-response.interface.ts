import { ETransactionStatus } from '../enums/transaction-status.enum';

export interface ITransactionResponse {
  id: string;
  status: ETransactionStatus;
}
