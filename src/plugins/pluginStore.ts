import { createPluginStore } from "react-pluggable";
import { RendererPlugin } from "./RendererPlugin";

export const pluginStore = createPluginStore();
pluginStore.install(new RendererPlugin());
