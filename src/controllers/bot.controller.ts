import {
  TurnContext,
  ActivityHandler,
  MessageFactory,
  CardFactory
} from 'botbuilder';
import {ResponseUtils} from "../utils/response.utils";
import {AuthService} from "../services/auth-service";

export class BotController extends ActivityHandler {
  
  constructor(private authService: AuthService) {
    super();

    this.onMessage(async (turnContext, next) => {
      await this.handleMessage(turnContext);
      await next();
    });
  }

  private handleMessage = async (turnContext: TurnContext) => {
      const url = this.authService.createAuthUrl(turnContext.activity.from.id);
      return await turnContext.sendActivity(ResponseUtils.createSignInResponse(url));
  };

}