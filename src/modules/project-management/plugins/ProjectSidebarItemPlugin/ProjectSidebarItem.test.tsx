import { renderWithProviders } from "test-utils";
import ProjectSidebarItem from "./ProjectSidebarItem";

jest.mock("modules/core", () => ({
  Can: ({ children }: any) => children,
}));

describe("ProjectSidebarItem unit tests", () => {
  it("Renders", () => {
    const { asFragment, getByText } = renderWithProviders(
      <ProjectSidebarItem />
    );

    expect(
      getByText("project-management.plugins.project_sidebar_item.btn_projects")
    ).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
});
