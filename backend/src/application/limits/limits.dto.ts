import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export class GetLimitsRequest {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name?: string;
}

export class CreateLimitRequest {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name!: string;

  @IsNumber({ maxDecimalPlaces: 8 })
  @IsPositive()
  maxAmount!: number;

  @IsInt()
  @IsPositive()
  maxDailyOrders!: number;
}

export class UpdateLimitRequest {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 8 })
  @IsPositive()
  maxAmount?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  maxDailyOrders?: number;
}

export interface LimitResponse {
  id: string;
  name: string;
  maxAmount: number;
  maxDailyOrders: number;
}
