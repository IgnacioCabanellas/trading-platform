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
  AssetResponse,
  CreateAssetRequest,
  GetAssetRequest,
  UpdateAssetRequest,
} from '@/application/asset/asset.dto';
import { AssetService } from '@/application/asset/asset.service';

@JsonController('/asset')
@Service()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  @OpenAPI({ summary: 'Get Assets' })
  get(@QueryParams() params: GetAssetRequest): Promise<AssetResponse[]> {
    return this.assetService.get(params);
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get asset by id' })
  getById(@Param('id') id: string): Promise<AssetResponse> {
    return this.assetService.getById(id);
  }

  @Post()
  @OpenAPI({ summary: 'Create asset' })
  create(@Body() body: CreateAssetRequest): Promise<AssetResponse> {
    return this.assetService.create(body);
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Update asset' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateAssetRequest
  ): Promise<AssetResponse> {
    return this.assetService.update(id, body);
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete asset' })
  @OnUndefined(200)
  delete(@Param('id') id: string): Promise<void> {
    return this.assetService.delete(id);
  }
}
