import { useEffect, useState } from "react";
import AuthManager from "utils/AuthManager";
import { captureException } from "@sentry/react";
import { Redirect } from "react-router";
import routingPrefix from "utils/routing-prefix";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const LoginCallback = () => {
  const [state, setState] = useState({
    processed: false,
    logged: false,
  });

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      AuthManager.processCallback()
        .then(() => {
          setState({ processed: true, logged: true });
        })
        .catch((e) => {
          toast.error(t("security.login_callback.errors.unauthorized"));
          setState({ processed: true, logged: false });
          captureException(e);
        });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state.processed ? (
    state.logged ? (
      <Redirect to="/" />
    ) : (
      <Redirect to={`${routingPrefix.security}/login`} />
    )
  ) : null;
};

export default LoginCallback;
