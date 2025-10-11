import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class GetTradingPairRequest {
  @IsOptional()
  @IsUUID()
  assetId?: string;
}

export class CreateTradingPairRequest {
  @IsOptional()
  @IsUUID()
  baseAssetId!: string;

  @IsOptional()
  @IsUUID()
  quoteAssetId!: string;
}

export class UpdateTradingPairRequest {
  @IsOptional()
  @IsUUID()
  baseAssetId?: string;

  @IsOptional()
  @IsUUID()
  quoteAssetId?: string;

  @IsBoolean()
  enabled?: boolean;
}

export interface TradingPairResponse {
  id: string;
  baseAssetId: string;
  quoteAssetId: string;
  enabled: boolean;
}
