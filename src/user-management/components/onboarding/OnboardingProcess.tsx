import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "apollo/local-state";
import { useGetCurrentUserQuery } from "generated/graphql";
import gql from "graphql-tag";
import OnboardingModal from "./OnboardingModal";

export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    currentUser {
      id
      firstName
      lastName
      status
    }
  }
`;

const OnboardingProcess = () => {
  const authenticated = useReactiveVar(isAuthenticated);
  const currentUserQuery = useGetCurrentUserQuery({
    skip: authenticated !== true,
  });

  if (currentUserQuery.loading || !currentUserQuery.data?.currentUser) {
    return null;
  }

  return <OnboardingModal user={currentUserQuery.data.currentUser} />;
};

export default OnboardingProcess;
