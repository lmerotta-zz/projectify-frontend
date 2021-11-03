import { PluginProvider, PluginStore } from "react-pluggable";
import { act, renderWithProviders } from "test-utils";
import Renderer from "./Renderer";
import { RendererPlugin } from "./RendererPlugin";

describe("RendererPlugin unit tests", () => {
  it("Allows to add components on the fly", () => {
    const plugin = () => <h1 data-testid="plugin-1">Add a plugin</h1>;

    const pluginStore = new PluginStore();
    pluginStore.install(new RendererPlugin());

    pluginStore.executeFunction(
      "ProjectifyRenderer.add",
      "test",
      "profile-menu-item-2",
      () => <h1>Test</h1>
    );

    const { getByTestId } = renderWithProviders(
      <PluginProvider pluginStore={pluginStore}>
        <Renderer section="test" />
        <Renderer section="otherone" />
      </PluginProvider>
    );

    expect(() => getByTestId("plugin-1")).toThrow();
    act(() => {
      pluginStore.executeFunction(
        "ProjectifyRenderer.add",
        "test",
        "profile-menu-item",
        plugin,
        999999
      );
    });

    expect(getByTestId("plugin-1")).toBeVisible();

    act(() => {
      pluginStore.executeFunction(
        "ProjectifyRenderer.remove",
        "test",
        "profile-menu-item"
      );

      pluginStore.executeFunction(
        "ProjectifyRenderer.remove",
        "test2",
        "profile-menu-item"
      );
    });

    expect(() => getByTestId("plugin-1")).toThrow();

    pluginStore.uninstall("RendererPlugin@0.0.1");
  });
});
