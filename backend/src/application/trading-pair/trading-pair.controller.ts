import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

import {
  CreateTradingPairRequest,
  GetTradingPairRequest,
  TradingPairResponse,
  UpdateTradingPairRequest,
} from '@/application/trading-pair/trading-pair.dto';
import { TradingPairService } from '@/application/trading-pair/trading-pair.service';

@JsonController('/trading-pair')
@Service()
export class TradingPairController {
  constructor(private readonly tradingPairService: TradingPairService) {}

  @Get()
  @OpenAPI({ summary: 'Get trading-pairs' })
  get(
    @QueryParams() params: GetTradingPairRequest
  ): Promise<TradingPairResponse[]> {
    return this.tradingPairService.get(params);
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get trading-pair by id' })
  getById(@Param('id') id: string): Promise<TradingPairResponse> {
    return this.tradingPairService.getById(id);
  }

  @Post()
  @OpenAPI({ summary: 'Create trading-pair' })
  create(@Body() body: CreateTradingPairRequest): Promise<TradingPairResponse> {
    return this.tradingPairService.create(body);
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Update trading-pair' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateTradingPairRequest
  ): Promise<TradingPairResponse> {
    return this.tradingPairService.update(id, body);
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete trading-pair' })
  @OnUndefined(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.tradingPairService.delete(id);
  }
}
