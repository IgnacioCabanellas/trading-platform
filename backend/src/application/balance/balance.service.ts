import { NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';

import {
  BalanceResponse,
  GetBalancesRequestPath,
} from '@/application/balance/balance.dto';
import { Balance } from '@/models/balance.model';
import { LoggerService } from '@/shared/logger.service';

@Service()
export class BalanceService {
  constructor(private readonly logger: LoggerService) {}

  private static toResponse(balance: Balance): BalanceResponse {
    return {
      id: balance.id,
      userId: balance.userId,
      assetId: balance.assetId,
      amount: balance.amount,
    };
  }

  private static toResponseArray(balances: Balance[]): BalanceResponse[] {
    return balances.map(balance => this.toResponse(balance));
  }

  async getByUser(params: GetBalancesRequestPath): Promise<BalanceResponse[]> {
    const balances = await Balance.findAll({
      where: {
        enabled: true,
        userId: params.userId,
      },
    });

    return BalanceService.toResponseArray(balances);
  }

  async getById(id: string): Promise<BalanceResponse> {
    const balance = await Balance.findOne({ where: { id, enabled: true } });

    if (!balance) {
      throw new NotFoundError(`Balance with id=${id} not found`);
    }

    return BalanceService.toResponse(balance);
  }

  async findOrCreateByUserAsset(
    userId: string,
    assetId: string
  ): Promise<Balance> {
    const [balance, created] = await Balance.findOrCreate({
      where: { userId, assetId },
      defaults: { userId, assetId },
    });
    if (created) {
      this.logger.info(
        `Balance created for user='${userId}' asset='${assetId}'`
      );
    }
    return balance;
  }
}
