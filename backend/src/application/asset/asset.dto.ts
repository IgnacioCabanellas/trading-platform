import { IsBoolean, IsOptional, Length } from 'class-validator';

export class GetAssetRequest {
  @IsOptional()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @Length(1, 10)
  symbol?: string;
}

export class CreateAssetRequest {
  @Length(1, 10)
  symbol!: string;

  @Length(1, 100)
  name!: string;

  @IsOptional()
  @Length(1, 300)
  description!: string;
}

export class UpdateAssetRequest {
  @IsOptional()
  @Length(1, 10)
  symbol?: string;

  @IsOptional()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @Length(1, 300)
  description?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export interface AssetResponse {
  id: string;
  symbol: string;
  name: string;
  description: string | undefined;
  enabled: boolean;
}
