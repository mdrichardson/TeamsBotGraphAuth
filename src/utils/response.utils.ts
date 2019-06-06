import {CardFactory, Activity} from "botbuilder";

export class ResponseUtils {
  static createSignInResponse(url: string): Partial<Activity> {
    return {
      attachments: [CardFactory.signinCard("Please sign in", url)]
    }
  }
  
}