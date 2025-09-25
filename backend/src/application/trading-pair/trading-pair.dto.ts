import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetTradingPairRequest {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  assetId?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export class CreateTradingPairRequest {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  baseAssetId!: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  quoteAssetId!: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled!: boolean;
}

export class UpdateTradingPairRequest {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  baseAssetId?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  quoteAssetId?: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled?: boolean;
}

export interface TradingPairResponse {
  id: string;
  baseAssetId: string;
  quoteAssetId: string;
  enabled: boolean;
}
