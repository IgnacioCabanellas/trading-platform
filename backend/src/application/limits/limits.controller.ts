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
  CreateLimitRequest,
  GetLimitsRequest,
  LimitResponse,
  UpdateLimitRequest,
} from './limits.dto';
import { LimitsService } from './limits.service';

@JsonController('/limits')
@Service()
export class LimitsController {
  constructor(private readonly limitsService: LimitsService) {}

  @Get()
  @OpenAPI({ summary: 'Get limits' })
  get(@QueryParams() params: GetLimitsRequest): Promise<LimitResponse[]> {
    return this.limitsService.get(params);
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get limit by id' })
  getById(@Param('id') id: string): Promise<LimitResponse> {
    return this.limitsService.getById(id);
  }

  @Post()
  @OpenAPI({ summary: 'Create limit' })
  create(@Body() body: CreateLimitRequest): Promise<LimitResponse> {
    return this.limitsService.create(body);
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Update limit' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateLimitRequest
  ): Promise<LimitResponse> {
    return this.limitsService.update(id, body);
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete limit' })
  @OnUndefined(200)
  delete(@Param('id') id: string): Promise<void> {
    return this.limitsService.delete(id);
  }
}
