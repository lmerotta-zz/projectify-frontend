import { UserManager } from "oidc-client";

class AuthManager {
  private userManager: UserManager;
  constructor() {
    this.userManager = new UserManager({
      authority: process.env.REACT_APP_ACTIONS_URL,
      response_type: "code",
      client_id: process.env.REACT_APP_OAUTH_CLIENTID,
      redirect_uri: process.env.REACT_APP_OAUTH_REDIRECTURI,
      silent_redirect_uri: process.env.REACT_APP_OAUTH_SILENT_REDIRECTURI,
      scope: "email",
    });
  }

  async login(args: any) {
    await this.userManager.signinRedirect(args);
  }

  async isLoggedIn() {
    return await this.userManager.signinSilent({
      scope: "email",
    });
  }

  async getUser() {
    return await this.userManager.getUser();
  }

  async removeUser() {
    await this.userManager.removeUser();
  }

  async logout() {
    await this.userManager.signoutRedirect();
  }
}

export default new AuthManager();
