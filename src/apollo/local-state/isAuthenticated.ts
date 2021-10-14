import { makeVar } from "@apollo/client";

const isAuthenticated = makeVar<boolean | null>(null);

export default isAuthenticated;
