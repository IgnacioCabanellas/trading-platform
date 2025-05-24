import express from "express";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";

import { environment } from "@/config/environment";
import { LoggerService } from "@/shared/logger.service";
import { requestLogger } from "@/shared/request-logger.middleware";

const logger = Container.get(LoggerService);

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers();
  }

  private initializeControllers(): void {
    useContainer(Container);
    useExpressServer(this.app, {
      controllers: [`${__dirname}/application/**/*.controller.ts`],
      validation: true,
      classTransformer: true,
    });
  }

  private initializeMiddleware(): void {
    this.app.use(requestLogger());
  }

  public listen(): void {
    this.app.listen(environment.port, () => {
      logger.info(`Server running on port ${environment.port}`);
    });
  }
}
