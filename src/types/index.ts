import { Ability, AbilityClass } from "@casl/ability";
import { UserManagementAbilitiesType } from "modules/user-management";

export type AppAbilityType = Ability<UserManagementAbilitiesType>;
export const AppAbility = Ability as AbilityClass<AppAbilityType>;
