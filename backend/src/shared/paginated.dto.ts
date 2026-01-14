import { IsPositive } from 'class-validator';

export class PaginatedRequest {
  @IsPositive()
  offset: number = 0;

  @IsPositive()
  limit: number = 20;
}
