import * as uuidv4 from 'uuid/v4';

export class AuthService {
  private userStates: Array<any> = new Array<any>();

  constructor() {
    
  }
  
  public createAuthUrl(userId: string) {
    this.userStates = new Array<any>();
    let state = {
      securityToken: uuidv4(),
      userId: userId
    };

    this.userStates.push(state);

    return "https://5d755b30.ngrok.io/html/auth-start.html?authorizationUrl=" + encodeURIComponent(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=fdf7bf33-3644-434e-83d5-b3575e33f008&state=${JSON.stringify(state)}&redirect_uri=https://5d755b30.ngrok.io/callback&response_type=code&response_mode=query&scope=user.readbasic.all`);
  }

  public getUserState(userId: string) {
    return this.userStates.find(user => user.userId == userId);
  }
}