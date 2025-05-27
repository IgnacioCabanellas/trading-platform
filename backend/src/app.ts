import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import express from "express";
import { OpenAPIObject } from "openapi3-ts";
import "reflect-metadata";
import {
  getMetadataArgsStorage,
  useContainer,
  useExpressServer,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swagger from "swagger-ui-express";
import { Container } from "typedi";

import { environment, isDevelopment } from "@/config/environment";
import { LoggerService } from "@/shared/logger.service";
import { requestLogger } from "@/shared/request-logger.middleware";

const logger = Container.get(LoggerService);

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializePreControllerMiddleware();
    this.initializeControllers();
    this.initializePostControllerMiddleware();
  }

  private initializeControllers(): void {
    useContainer(Container);
    useExpressServer(this.app, {
      controllers: [this.getControllersDirectoryPattern()],
      routePrefix: "/api",
      validation: true,
      classTransformer: true,
    });
  }

  private initializePreControllerMiddleware(): void {
    this.app.use(requestLogger());
  }

  private initializePostControllerMiddleware(): void {
    if (isDevelopment()) {
      const specs = this.buildOpenApiSpecs();
      this.app.use("/docs", swagger.serve, swagger.setup(specs));
    }
  }

  private buildOpenApiSpecs(): OpenAPIObject {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
    });

    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(
      storage,
      { controllers: [this.getControllersDirectoryPattern()] },
      {
        components: {
          schemas,
        },
        info: {
          title: "Trading Platform",
          version: "1.0.0",
        },
      }
    );
  }

  private getControllersDirectoryPattern(): string {
    return `${__dirname}/application/**/*.controller.ts`;
  }

  public listen(): void {
    this.app.listen(environment.port, () => {
      logger.info(`Server running on port ${environment.port}`);
    });
  }
}
