import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";

import { HealthResponse } from "@/application/health/health.dto";

@JsonController("/health")
@Service()
export class HealthController {
  @Get()
  public getHealth(): HealthResponse {
    return {
      timestamp: new Date().toISOString(),
      message: "Service is healthy",
    };
  }
}
