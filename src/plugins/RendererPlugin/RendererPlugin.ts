import { IPlugin, PluginStore } from "react-pluggable";
import ComponentMapUpdatedEvent from "./ComponentMapUpdatedEvent";

type ComponentItemType = {
  name: string; // a unique name
  component: () => JSX.Element;
  priority: number;
};

type ComponentMapType = Map<string, ComponentItemType[]>;

class RendererPlugin implements IPlugin {
  pluginStore!: PluginStore;
  namespace = "ProjectifyRenderer";
  componentMap: ComponentMapType = new Map();

  getPluginName() {
    return `${this.namespace}@alpha-0`;
  }

  getDependencies() {
    return [];
  }

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  addComponent(
    section: string,
    name: string,
    component: () => JSX.Element,
    priority: number = 0
  ) {
    const componentSection = this.componentMap.get(section) || [];
    componentSection.push({ name, component, priority });
    componentSection.sort((a, b) => a.priority - b.priority);

    this.componentMap.set(section, componentSection);
    this.pluginStore.dispatchEvent(new ComponentMapUpdatedEvent(section));
  }

  getComponentsForSection(section: string) {
    return this.componentMap.get(section) || [];
  }

  activate() {
    this.pluginStore.addFunction(
      `${this.namespace}.add`,
      this.addComponent.bind(this)
    );
    this.pluginStore.addFunction(
      `${this.namespace}.get`,
      this.getComponentsForSection.bind(this)
    );
  }

  deactivate() {
    this.pluginStore.removeFunction(`${this.namespace}.add`);
    this.pluginStore.removeFunction(`${this.namespace}.get`);
  }
}

export type RendererPluginType = {
  executeFunction(
    functionName: "ProjectifyRenderer.add",
    section: string,
    name: string,
    component: () => JSX.Element,
    priority: number
  ): void;

  executeFunction(
    functionName: "ProjectifyRenderer.add",
    section: string,
    name: string,
    component: () => JSX.Element
  ): void;

  executeFunction(
    functionName: "ProjectifyRenderer.get",
    section: string
  ): ComponentItemType[];
};

export default RendererPlugin;
