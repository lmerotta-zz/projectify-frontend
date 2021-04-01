import { useEffect } from "react";
import AuthManager from "utils/AuthManager";

const DirectLogin = () => {
  useEffect(() => {
    setTimeout(() => {
      AuthManager.login();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default DirectLogin;
