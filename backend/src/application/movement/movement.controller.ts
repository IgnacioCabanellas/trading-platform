import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

import {
  DepositRequest,
  GetMovementsRequest,
  MovementResponse,
  WithdrawRequest,
} from '@/application/movement/movement.dto';
import { MovementService } from '@/application/movement/movement.service';

@JsonController('/movements')
@Service()
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  @OpenAPI({ summary: 'Get movements' })
  get(@QueryParams() params: GetMovementsRequest): Promise<MovementResponse[]> {
    return this.movementService.get(params);
  }

  @Post('/deposit')
  @OpenAPI({ summary: 'Deposit' })
  deposit(@Body() request: DepositRequest): Promise<MovementResponse> {
    return this.movementService.deposit(request);
  }

  @Post('/withdraw')
  @OpenAPI({ summary: 'Withdraw' })
  withdraw(@Body() request: WithdrawRequest): Promise<MovementResponse> {
    return this.movementService.withdraw(request);
  }
}
