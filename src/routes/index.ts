import {APIRouterWrapper} from './api';
import * as express from 'express';
import {IRouterWrapper} from "./Router.interface";
import {AuthService} from "../services/auth-service";

export class BaseRouterWrapper implements IRouterWrapper {
  private readonly expressRouter: express.Router;

  constructor(private apiRouter: APIRouterWrapper,
              private authService: AuthService) {
    this.expressRouter = express.Router();
  }

  public setupRoutes(): void {
    this.apiRouter.setupRoutes();
    this.expressRouter.use('/api', this.apiRouter.getRouter());
    this.expressRouter.use('/callback', (req, res, next) => {
      const state = JSON.parse(req.query.state);
      const savedState = this.authService.getUserState(state.userId);
      if (savedState.securityToken == state.securityToken) {
        res.render('oauth-callback-success', {
          verificationCode: state.securityToken,
          providerName: 'Graph',
          layout: false
        });
      } else {
        res.send("FAILED");
      }
    });
  }

  public getRouter(): express.Router {
    return this.expressRouter;
  }
};