import { pluginStore } from "plugins";
import { lazy } from "react";
import { ProjectSidebarItemPlugin } from "./plugins/ProjectSidebarItemPlugin";

export * from "./permissions/computeAbility";
pluginStore.install(new ProjectSidebarItemPlugin());

export const ProjectManagementPage = lazy(
  () => import("./pages/ProjectManagementPage/ProjectManagementPage")
);
