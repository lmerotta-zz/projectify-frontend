import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from "@casl/ability";
import { Project, User, UserPermissions } from "generated/graphql";
import { PartialDeep } from "type-fest";

export type ProjectManagementAbilitiesType = [
  "view" | "create",
  InferSubjects<PartialDeep<Project> & { __typename: Project["__typename"] }>
];

type ProjectManagementAbilityObjectType =
  Ability<ProjectManagementAbilitiesType>;
const ProjectManagementAbilityObject =
  Ability as AbilityClass<ProjectManagementAbilityObjectType>;

type FlatProject = Project & {
  "creator.id": Project["creator"]["id"];
};

export const computeProjectAbility = (
  permissions: Pick<UserPermissions, "PROJECT_VIEW_OWN" | "PROJECT_CREATE">,
  userId: User["id"]
) => {
  const ability = new AbilityBuilder(ProjectManagementAbilityObject);

  if (permissions.PROJECT_VIEW_OWN) {
    ability.can<FlatProject>("view", "Project", { "creator.id": userId });
  }

  if (permissions.PROJECT_CREATE) {
    ability.can("create", "Project");
  }

  return ability.build({ detectSubjectType: (object) => object.__typename });
};
