import { useEffect, useState } from "react";
import { PluginStore, usePluginStore } from "react-pluggable";
import ComponentMapUpdatedEvent, {
  EVENT_NAME,
} from "./ComponentMapUpdatedEvent";
import { RendererPluginType } from "./RendererPlugin";

type RendererProps = {
  section: string;
};

const Renderer = ({ section }: RendererProps) => {
  const pluginStore: PluginStore & RendererPluginType = usePluginStore();
  const [forced, forceUpdate] = useState(0);

  useEffect(() => {
    const eventListener = (event: ComponentMapUpdatedEvent) => {
      if (event.section === section) {
        forceUpdate(forced + 1);
      }
    };
    pluginStore.addEventListener(EVENT_NAME, eventListener);

    return () => {
      pluginStore.removeEventListener(EVENT_NAME, eventListener);
    };
  }, [pluginStore, section, forced]);

  let components = pluginStore.executeFunction(
    "ProjectifyRenderer.get",
    section
  );

  return (
    <>
      {components.map(({ component: Component, name }) => (
        <Component key={name} />
      ))}
    </>
  );
};

export default Renderer;
