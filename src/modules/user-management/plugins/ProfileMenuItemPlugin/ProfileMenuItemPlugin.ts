import { RendererPluginType } from "plugins";
import { IPlugin, PluginStore } from "react-pluggable";
import ProfileMenuItem from "./ProfileMenuItem";

class ProfileMenuItemPlugin implements IPlugin {
  pluginStore!: PluginStore & RendererPluginType;
  namespace = "ProjectifyUserManagementProfileMenuItem";

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
      "app-header",
      "profile-menu-item",
      ProfileMenuItem,
      999999
    );
  }

  deactivate() {
    this.pluginStore.executeFunction(
      "ProjectifyRenderer.remove",
      "app-header",
      "profile-menu-item"
    );
  }
}

export default ProfileMenuItemPlugin;
