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

    const me ='https://bfsupportrelay.servicebus.windows.net/vmicricRelay3979';

    const old = 'https://5d755b30.ngrok.io';

    return `${ me }/html/auth-start.html?authorizationUrl=` + encodeURIComponent(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=e448cbbc-308e-47f2-ad8b-aa333855f1cd&state=${JSON.stringify(state)}&redirect_uri=${ me }/callback&response_type=code&response_mode=query&scope=user.readbasic.all`);
  }

  public getUserState(userId: string) {
    return this.userStates.find(user => user.userId == userId);
  }
}