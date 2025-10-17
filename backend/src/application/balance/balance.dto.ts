import { IsUUID } from 'class-validator';

export class GetBalancesRequestPath {
  @IsUUID()
  userId!: string;
}

export interface BalanceResponse {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
}
