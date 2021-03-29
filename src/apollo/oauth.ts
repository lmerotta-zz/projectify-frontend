import { makeVar } from "@apollo/client";

type OAuthBag = {
  verifier: string;
  challenge: string;
  one_time_code?: string;
  access_token?: string;
  refresh_token?: string;
};

export const oauthBag = makeVar<OAuthBag>({
  verifier: "HjHMNAhDZZn9ln1wOHf6jD4oSGmw5OSilQV8n2jFwiA", // TODO: variabilize this !
  challenge: "UdFfYchv1a6tryk3-n_EsFm9CuBZqq5ICCv29SXTiiI", // TODO: variabilize this !
});
