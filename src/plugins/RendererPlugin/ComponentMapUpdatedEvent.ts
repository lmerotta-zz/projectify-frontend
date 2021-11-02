import { Event } from "react-pluggable";

export const EVENT_NAME = "ProjectifyRendererPlugin.ComponentMapUpdated";

class ComponentMapUpdatedEvent extends Event {
  section: string;
  constructor(section: string) {
    super(EVENT_NAME);
    this.section = section;
  }
}

export default ComponentMapUpdatedEvent;
