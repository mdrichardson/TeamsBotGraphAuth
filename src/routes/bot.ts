import {IRouterWrapper} from "./router.interface";
import * as express from 'express';
import {BotController} from "../controllers/bot.controller";
import {BotFrameworkAdapter} from "botbuilder";

export class BotRouterWrapper implements IRouterWrapper {
  private readonly expressRouter: express.Router;

  constructor(private adapter: BotFrameworkAdapter, private botController: BotController) {
    this.expressRouter = express.Router();
  }

  setupRoutes(): void {
    this.expressRouter.post('/messages', (req, res) => {
      console.log(req);
      this.adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await this.botController.run(context);
      });
    });
  }

  getRouter(): express.Router {
    return this.expressRouter;
  }
}