import * as express from 'express';
import {IRouterWrapper} from './router.interface'
import {BotRouterWrapper} from './bot';

export class APIRouterWrapper implements IRouterWrapper {
  private readonly expressRouter: express.Router;

  constructor(private botRouter: BotRouterWrapper) {
    this.expressRouter = express.Router();
  }

  public setupRoutes(): void {
    this.botRouter.setupRoutes();
    this.expressRouter.use(this.botRouter.getRouter());
  }

  public getRouter(): express.Router {
    return this.expressRouter;
  }
};