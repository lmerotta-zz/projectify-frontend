import { UserManager } from "oidc-client";

class AuthManager {
  private userManager: UserManager;
  constructor() {
    this.userManager = new UserManager({
      authority: process.env.REACT_APP_ACTIONS_URL,
      response_type: "code",
      metadata: {
        issuer: "",
        authorization_endpoint: `${process.env.REACT_APP_ACTIONS_URL}/authorize`,
        token_endpoint: `${process.env.REACT_APP_ACTIONS_URL}/token`,
        userinfo_endpoint: "",
        end_session_endpoint: "",
        jwks_uri: "",
      },
      client_id: process.env.REACT_APP_OAUTH_CLIENTID,
      redirect_uri: process.env.REACT_APP_OAUTH_REDIRECTURI,
      scope: "email",
    });
  }

  async login() {
    await this.userManager.signinRedirect();
  }

  async processCallback() {
    await this.userManager.signinRedirectCallback();
    this.userManager.startSilentRenew();
  }

  async isLoggedIn() {
    return await this.userManager.getUser();
  }
}

export default new AuthManager();
