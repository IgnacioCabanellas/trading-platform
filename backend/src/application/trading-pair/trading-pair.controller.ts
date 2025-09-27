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
} from './trading-pair.dto';
import { TradingPairService } from './trading-pair.service';

@JsonController('/trading-pair')
@Service()
export class TradingPairController {
  constructor(private readonly TradingPairService: TradingPairService) {}

  @Get()
  @OpenAPI({ summary: 'Get trading-pairs' })
  get(
    @QueryParams() params: GetTradingPairRequest
  ): Promise<TradingPairResponse[]> {
    return this.TradingPairService.get(params);
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get trading-pair by id' })
  getById(@Param('id') id: string): Promise<TradingPairResponse> {
    return this.TradingPairService.getById(id);
  }

  @Post()
  @OpenAPI({ summary: 'Create trading-pair' })
  create(@Body() body: CreateTradingPairRequest): Promise<TradingPairResponse> {
    return this.TradingPairService.create(body);
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Update trading-pair' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateTradingPairRequest
  ): Promise<TradingPairResponse> {
    return this.TradingPairService.update(id, body);
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete trading-pair' })
  @OnUndefined(200)
  delete(@Param('id') id: string): Promise<void> {
    return this.TradingPairService.delete(id);
  }
}
