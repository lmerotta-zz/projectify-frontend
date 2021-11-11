import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from "@casl/ability";
import { User, UserPermissions } from "generated/graphql";

export type UserManagementAbilitiesType = [
  "view" | "edit",
  InferSubjects<Partial<User> & { __typename: User["__typename"] }>
];

type UserManagementAbilityObjectType = Ability<UserManagementAbilitiesType>;
const UserManagementAbilityObject =
  Ability as AbilityClass<UserManagementAbilityObjectType>;

export const computeUserAbility = (
  permissions: Pick<UserPermissions, "USER_EDIT_SELF" | "USER_VIEW_SELF">,
  userId: User["id"]
) => {
  const ability = new AbilityBuilder(UserManagementAbilityObject);

  if (permissions.USER_VIEW_SELF) {
    ability.can("view", "User", { id: userId });
  }

  if (permissions.USER_EDIT_SELF) {
    ability.can("edit", "User", { id: userId });
  }

  return ability.build({ detectSubjectType: (object) => object.__typename });
};
