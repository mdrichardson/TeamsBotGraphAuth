import * as express from 'express';
import * as exphbs from 'express-handlebars';
import {BaseRouterWrapper} from './routes';
import {APIRouterWrapper} from './routes/api';
import {BotRouterWrapper} from './routes/bot';
import {BotController} from './controllers/bot.controller';
import {BotFrameworkAdapter} from "botbuilder";
import * as path from "path";
import {AuthService} from "./services/auth-service";

export class App {
  private express: express.Application;

  constructor(private config) {
    this.express = express();
  }

  async init() {
    let adapter = new BotFrameworkAdapter({
      appId: this.config.bot.appId,
      appPassword: this.config.bot.appPassword
    });

    adapter.onTurnError = async (context, error) => {
      console.error(`\n [onTurnError]: ${error}`);
      await context.sendActivity(`Oops! Something has went wrong.`);
    };
    
    const authService: AuthService = new AuthService();
    const baseRouter: BaseRouterWrapper =
      new BaseRouterWrapper(
        new APIRouterWrapper(
          new BotRouterWrapper(
            adapter,
            new BotController(authService)
          )
        ),
        authService
      );

    baseRouter.setupRoutes();


    let handlebars = exphbs.create({
      extname: ".hbs",
      helpers: {
        appId: () => { return this.config.bot.appId; },
      },
    });
    this.express.engine("hbs", handlebars.engine);
    this.express.set("view engine", "hbs");
    this.express.set("views", __dirname + "\\..\\views");
    this.express.use(express.static(path.join(__dirname, "../public")));
    
    this.express.use('/', baseRouter.getRouter());
  }

  listen() {
    this.express.listen(this.config.app.port, () => {
      console.log("Listening on port " + this.config.app.port);
    })
  }
}