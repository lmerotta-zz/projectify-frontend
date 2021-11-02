import { pluginStore } from "plugins";
import { ProfileMenuItemPlugin } from "./plugins/ProfileMenuItemPlugin";

export * from "./permissions/computeAbility";
pluginStore.install(new ProfileMenuItemPlugin());
