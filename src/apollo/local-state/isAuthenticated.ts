import { makeVar } from "@apollo/client";

/* istanbul ignore next */
const isAuthenticated = makeVar<boolean | null>(null);

export default isAuthenticated;
