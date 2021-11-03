import { Ability, AbilityClass } from "@casl/ability";
import { ProjectManagementAbilitiesType } from "modules/project-management";
import { UserManagementAbilitiesType } from "modules/user-management";

export type AppAbilityType = Ability<
  UserManagementAbilitiesType | ProjectManagementAbilitiesType
>;
export const AppAbility = Ability as AbilityClass<AppAbilityType>;
