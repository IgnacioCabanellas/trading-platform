import { BadRequestError, NotFoundError } from 'routing-controllers';
import { Op, WhereOptions } from 'sequelize';
import { Service } from 'typedi';

import {
  AssetResponse,
  CreateAssetRequest,
  GetAssetRequest,
  UpdateAssetRequest,
} from '@/application/asset/asset.dto';
import { Asset } from '@/models/asset.model';

@Service()
export class AssetService {
  private static toResponse(asset: Asset): AssetResponse {
    return {
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      description: asset.description,
      enabled: asset.enabled,
    };
  }

  private static toResponseArray(assets: Asset[]): AssetResponse[] {
    return assets.map(asset => this.toResponse(asset));
  }

  async get(request: GetAssetRequest): Promise<AssetResponse[]> {
    const where: WhereOptions = {
      enabled: true,
    };

    if (request.name) {
      where.name = {
        [Op.iLike]: `%${request.name}%`,
      };
    }

    if (request.symbol) {
      where.symbol = {
        [Op.iLike]: `${request.symbol}`,
      };
    }

    const assets = await Asset.findAll({
      where,
    });

    return AssetService.toResponseArray(assets);
  }

  async getById(id: string): Promise<AssetResponse> {
    const asset = await Asset.findOne({ where: { id, enabled: true } });

    if (!asset) {
      throw new NotFoundError(`Asset with id=${id} not found`);
    }

    return AssetService.toResponse(asset);
  }

  async update(id: string, body: UpdateAssetRequest): Promise<AssetResponse> {
    const asset = await Asset.findOne({ where: { id, enabled: true } });

    if (!asset) {
      throw new NotFoundError(`Asset with id=${id} not found`);
    }

    const updateData: Partial<UpdateAssetRequest> = {};

    if (body.name !== undefined) {
      updateData.name = body.name;
    }
    if (body.symbol !== undefined) {
      updateData.symbol = body.symbol;
    }
    if (body.description !== undefined) {
      updateData.description = body.description;
    }

    await asset.update(updateData);

    return AssetService.toResponse(asset);
  }

  async create(body: CreateAssetRequest): Promise<AssetResponse> {
    const existingAsset = await Asset.findOne({ where: { name: body.name } });

    if (existingAsset) {
      throw new BadRequestError(
        `Asset with name '${body.name}' already exists`
      );
    }

    const asset = await Asset.create({ ...body });

    return AssetService.toResponse(asset);
  }

  async delete(id: string): Promise<void> {
    const asset = await Asset.findOne({ where: { id, enabled: true } });

    if (!asset) {
      throw new NotFoundError(`Asset with id=${id} not found`);
    }

    await asset.update({ enabled: false });
  }
}
