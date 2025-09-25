import { NotFoundError } from 'routing-controllers';
import { Op, WhereOptions } from 'sequelize';
import { Service } from 'typedi';

import { TradingPair } from '@/models/tradingPair.model';

import {
  CreateTradingPairRequest,
  GetTradingPairRequest,
  TradingPairResponse,
  UpdateTradingPairRequest,
} from './trading-pair.dto';

@Service()
export class TradingPairService {
  private static toResponse(tradingPair: TradingPair): TradingPairResponse {
    return {
      id: tradingPair.id,
      baseAssetId: tradingPair.baseAssetId,
      quoteAssetId: tradingPair.quoteAssetId,
      enabled: tradingPair.enabled,
    };
  }

  private static toResponseArray(
    tradingPairs: TradingPair[]
  ): TradingPairResponse[] {
    return tradingPairs.map(tradingPair => this.toResponse(tradingPair));
  }

  async get(request: GetTradingPairRequest): Promise<TradingPairResponse[]> {
    const whereCondition: WhereOptions = {
      enabled: true,
      ...(request.assetId?.trim()
        ? {
            [Op.or]: [
              { baseAssetId: request.assetId },
              { quoteAssetId: request.assetId },
            ],
          }
        : {}),
    };
    const tradingPairs = await TradingPair.findAll({
      where: whereCondition,
    });
    return TradingPairService.toResponseArray(tradingPairs);
  }

  async getById(id: string): Promise<TradingPairResponse> {
    const tradingPair = await TradingPair.findOne({
      where: { id, enabled: true },
    });

    if (!tradingPair) {
      throw new NotFoundError(`Trading-Pair with id=${id} not found`);
    }

    return TradingPairService.toResponse(tradingPair);
  }

  async update(
    id: string,
    body: UpdateTradingPairRequest
  ): Promise<TradingPairResponse> {
    const tradingPair = await TradingPair.findOne({
      where: { id, enabled: true },
    });

    if (!tradingPair) {
      throw new NotFoundError(`Trading-Pair with id=${id} not found`);
    }

    const updateData: Partial<UpdateTradingPairRequest> = {};

    if (body.quoteAssetId !== undefined) {
      updateData.quoteAssetId = body.quoteAssetId;
    }
    if (body.baseAssetId !== undefined) {
      updateData.baseAssetId = body.baseAssetId;
    }

    await tradingPair.update(updateData);
    return TradingPairService.toResponse(tradingPair);
  }

  async create(body: CreateTradingPairRequest): Promise<TradingPairResponse> {
    const tradingPair = await TradingPair.create({ ...body });
    return TradingPairService.toResponse(tradingPair);
  }

  async delete(id: string): Promise<void> {
    const tradingPair = await TradingPair.findOne({
      where: { id, enabled: true },
    });

    if (!tradingPair) {
      throw new NotFoundError(`Trading-Pair with id=${id} not found`);
    }

    await tradingPair.update({ enabled: false });
  }
}
