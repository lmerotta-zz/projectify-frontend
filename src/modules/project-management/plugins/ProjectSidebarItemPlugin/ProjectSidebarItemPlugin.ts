import { RendererPluginType } from "plugins";
import { IPlugin, PluginStore } from "react-pluggable";
import ProjectSidebarItem from "./ProjectSidebarItem";

class ProjectSidebarItemPlugin implements IPlugin {
  pluginStore!: PluginStore & RendererPluginType;
  namespace = "ProjectifyProjectManagementProjectSidebarItem";

  getPluginName() {
    return `${this.namespace}@0.0.1`;
  }

  getDependencies() {
    return ["ProjectifyRenderer@0.0.1"];
  }

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {
    this.pluginStore.executeFunction(
      "ProjectifyRenderer.add",
      "app-sidebar",
      "project-sidebar-item",
      ProjectSidebarItem,
      999999
    );
  }

  /* istanbul ignore next */
  deactivate() {
    this.pluginStore.executeFunction(
      "ProjectifyRenderer.remove",
      "app-sidebar",
      "project-sidebar-item"
    );
  }
}

export default ProjectSidebarItemPlugin;
