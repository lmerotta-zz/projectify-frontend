import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from "@casl/ability";
import { Project, User, UserPermissions } from "generated/graphql";

export type ProjectManagementAbilitiesType = [
  "view-own",
  InferSubjects<Partial<Project> & { __typename: Project["__typename"] }>
];

type ProjectManagementAbilityObjectType =
  Ability<ProjectManagementAbilitiesType>;
const ProjectManagementAbilityObject =
  Ability as AbilityClass<ProjectManagementAbilityObjectType>;

type FlatProject = Project & {
  "creator.id": Project["creator"]["id"];
};

export const computeProjectAbility = (
  permissions: Pick<UserPermissions, "PROJECT_VIEW_OWN">,
  userId: User["id"]
) => {
  const ability = new AbilityBuilder(ProjectManagementAbilityObject);

  if (permissions.PROJECT_VIEW_OWN) {
    ability.can<FlatProject>("view-own", "Project", { "creator.id": userId });
  }

  return ability.build({ detectSubjectType: (object) => object.__typename });
};
