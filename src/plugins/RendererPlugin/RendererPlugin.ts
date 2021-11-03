import { IPlugin, PluginStore } from "react-pluggable";
import ComponentMapUpdatedEvent from "./ComponentMapUpdatedEvent";

type ComponentItemType = {
  name: string; // a unique name
  component: () => JSX.Element;
  priority: number;
};

type ComponentMapType = Map<string, ComponentItemType[]>;

export class RendererPlugin implements IPlugin {
  pluginStore!: PluginStore;
  namespace = "ProjectifyRenderer";
  componentMap: ComponentMapType = new Map();

  getPluginName() {
    return `${this.namespace}@0.0.1`;
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
    const componentSection = (this.componentMap.get(section) || []).filter(
      (component) => component.name !== name
    );
    componentSection.push({ name, component, priority });

    componentSection.sort((a, b) => a.priority - b.priority);

    this.componentMap.set(section, componentSection);
    this.pluginStore.dispatchEvent(new ComponentMapUpdatedEvent(section));
  }

  removeComponent(section: string, name: string) {
    this.componentMap.set(
      section,
      (this.componentMap.get(section) || []).filter(
        (component) => component.name !== name
      )
    );
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
    this.pluginStore.addFunction(
      `${this.namespace}.remove`,
      this.removeComponent.bind(this)
    );
  }

  /* istanbul ignore next */
  deactivate() {
    this.pluginStore.removeFunction(`${this.namespace}.add`);
    this.pluginStore.removeFunction(`${this.namespace}.get`);
    this.pluginStore.removeFunction(`${this.namespace}.remove`);
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

  executeFunction(
    functionName: "ProjectifyRenderer.remove",
    section: string,
    name: string
  ): void;
};
