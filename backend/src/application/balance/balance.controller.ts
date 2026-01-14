import { Get, JsonController, Params } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

import {
  BalanceResponse,
  GetBalancesRequestPath,
} from '@/application/balance/balance.dto';
import { BalanceService } from '@/application/balance/balance.service';

@JsonController('/balance')
@Service()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('/user/:userId')
  @OpenAPI({ summary: 'Get Balances for a user' })
  getByUser(
    @Params() params: GetBalancesRequestPath
  ): Promise<BalanceResponse[]> {
    return this.balanceService.getByUser(params);
  }
}
