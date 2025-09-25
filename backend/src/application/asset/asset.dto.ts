import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class GetAssetRequest {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  symbol?: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  description?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export class CreateAssetRequest {
  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  symbol!: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name!: string;

  @IsString()
  @Length(1, 300)
  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled!: boolean;
}

export class UpdateAssetRequest {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  symbol?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
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
  description: string;
  enabled: boolean;
}
