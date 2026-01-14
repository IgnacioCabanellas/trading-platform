import { IsOptional, IsPositive, IsUUID } from 'class-validator';

import { PaginatedRequest } from '@/shared/paginated.dto';

export class GetMovementsRequest extends PaginatedRequest {
  @IsUUID()
  userId!: string;

  @IsOptional()
  @IsUUID()
  assetId?: string;
}

export class DepositRequest {
  @IsUUID()
  userId!: string;

  @IsUUID()
  assetId!: string;

  @IsPositive()
  amount!: number;
}

export class WithdrawRequest {
  @IsUUID()
  userId!: string;

  @IsUUID()
  assetId!: string;

  @IsPositive()
  amount!: number;
}

export interface MovementResponse {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
}
