import { makeVar } from "@apollo/client";

type OAuthBag = {
  verifier: string;
  challenge: string;
  one_time_code?: string;
  access_token?: string;
  refresh_token?: string;
};

export const oauthBag = makeVar<OAuthBag>({
  verifier: "HjHMNAhDZZn9ln1wOHf6jD4oSGmw5OSilQV8n2jFwiA", // used only for testing
  challenge: "UdFfYchv1a6tryk3-n_EsFm9CuBZqq5ICCv29SXTiiI", // used only for testing
});

/* istanbul ignore next */
const generateHashes = async () => {
  function base64URLEncode(str: string) {
    return btoa(str);
  }

  async function sha256(buffer: ArrayBuffer) {
    return await crypto.subtle.digest("SHA-256", buffer);
  }

  console.log(window);
  const verifierBuffer = window.crypto.getRandomValues(new Uint32Array(10));
  const verifier = base64URLEncode(verifierBuffer.join(""));

  const challengeBuffer = await sha256(verifierBuffer);
  const challenge = Array.prototype.map
    .call(new Uint8Array(challengeBuffer), (x) =>
      ("00" + x.toString(16)).slice(-2)
    )
    .join("");

  oauthBag({
    verifier,
    challenge,
  });
};

if (process.env.NODE_ENV !== "test") {
  generateHashes();
}
