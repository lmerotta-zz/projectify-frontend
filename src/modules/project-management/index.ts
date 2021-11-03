import { pluginStore } from "plugins";
import { ProjectSidebarItemPlugin } from "./plugins/ProjectSidebarItemPlugin";

export * from "./permissions/computeAbility";
pluginStore.install(new ProjectSidebarItemPlugin());
