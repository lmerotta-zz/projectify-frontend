import { gql, useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "apollo/local-state";
import { useGetCurrentUserPermissionsQuery } from "generated/graphql";
import { computeProjectAbility } from "modules/project-management";
import { computeUserAbility } from "modules/user-management";
import { useMemo } from "react";
import { AppAbility } from "types";

export const USER_PERMISSIONS_HOOK_QUERY = gql`
  query getCurrentUserPermissions {
    currentUser {
      id
      permissions {
        USER_EDIT_SELF
        USER_VIEW_SELF
        PROJECT_VIEW_OWN
        PROJECT_CREATE
      }
    }
  }
`;

/* istanbul ignore next */
const usePermissions = () => {
  const authenticated = useReactiveVar(isAuthenticated);
  const userPermissionsQuery = useGetCurrentUserPermissionsQuery({
    skip: !authenticated,
  });

  const permissions = JSON.stringify(
    userPermissionsQuery.data?.currentUser?.permissions
  );

  const computedAbility = useMemo(() => {
    const pendingAbility = new AppAbility(undefined, {
      detectSubjectType: (object) => object.__typename,
    });
    if (!userPermissionsQuery.loading) {
      const userAbilities = computeUserAbility(
        userPermissionsQuery.data!.currentUser!.permissions!,
        userPermissionsQuery.data!.currentUser!.id
      );
      const projectAbilities = computeProjectAbility(
        userPermissionsQuery.data!.currentUser!.permissions!,
        userPermissionsQuery.data!.currentUser!.id
      );

      pendingAbility.update([
        ...userAbilities.rules,
        ...projectAbilities.rules,
      ]);
    }

    return pendingAbility;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    permissions,
    userPermissionsQuery.data?.currentUser?.id,
    userPermissionsQuery.loading,
  ]);

  return computedAbility;
};

export default usePermissions;
