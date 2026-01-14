import { QueryTypes } from 'sequelize';
import { Service } from 'typedi';

import { BalanceService } from '@/application/balance/balance.service';
import {
  DepositRequest,
  GetMovementsRequest,
  MovementResponse,
  WithdrawRequest,
} from '@/application/movement/movement.dto';
import { sequelize } from '@/config/sequelize';
import { Movement, MovementType } from '@/models/movement.model';

@Service()
export class MovementService {
  constructor(private readonly balanceService: BalanceService) {}

  async get(request: GetMovementsRequest): Promise<MovementResponse[]> {
    const whereConditions: string[] = [
      'movements.enabled',
      'balances.user_id = :userId',
    ];

    if (request.assetId) {
      whereConditions.push('balances.asset_id = :assetId');
    }

    return await sequelize.query<MovementResponse>(
      `
        SELECT
          movements.id AS "id",
          movements.amount AS "amount",
          balances.user_id AS "userId",
          balances.asset_id AS "assetId"
        FROM movements
        JOIN balances ON
          movements.balance_id = balances.id
          AND balances.enabled
        WHERE ${whereConditions.join(' AND ')}
        OFFSET :offset
        LIMIT :limit;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          userId: request.userId,
          assetId: request.assetId,
          offset: request.offset,
          limit: request.limit,
        },
      }
    );
  }

  async deposit(request: DepositRequest): Promise<MovementResponse> {
    const balance = await this.balanceService.findOrCreateByUserAsset(
      request.userId,
      request.assetId
    );
    const movement = await Movement.create({
      amount: request.amount,
      balanceId: balance.id,
      movementType: MovementType.DEPOSIT,
    });
    return {
      id: movement.id,
      amount: movement.amount,
      assetId: balance.assetId,
      userId: balance.userId,
    };
  }

  async withdraw(request: WithdrawRequest): Promise<MovementResponse> {
    const balance = await this.balanceService.findOrCreateByUserAsset(
      request.userId,
      request.assetId
    );
    const movement = await Movement.create({
      amount: request.amount,
      balanceId: balance.id,
      movementType: MovementType.WITHDRAW,
    });
    return {
      id: movement.id,
      amount: movement.amount,
      assetId: balance.assetId,
      userId: balance.userId,
    };
  }
}
