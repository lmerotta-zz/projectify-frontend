import { renderWithProviders, userEvent, waitFor } from "test-utils";
import ProjectManagementPage from "../ProjectManagementPage/ProjectManagementPage";
import { CREATE_PROJECT_MUTATION } from "./components/ProjectFormDialog/ProjectFormDialog";
import { LIST_PROJECTS_PAGE_QUERY } from "./ListProjectsPage";

jest.mock("@mui/utils/useId", () => () => "1234");

describe("ListProjectsPage", () => {
  it("Displays an icon to add a new project if the result is empty", async () => {
    const mocks = [
      {
        request: {
          query: LIST_PROJECTS_PAGE_QUERY,
          variables: {
            first: 10,
          },
        },
        result: {
          data: {
            projects: null,
          },
        },
      },
    ];
    const { findByText, asFragment } = renderWithProviders(
      <ProjectManagementPage />,
      {
        routerProps: { initialEntries: ["/"] },
        graphqlProps: { mocks },
      }
    );

    await findByText("project-management.list_projects_page.no_projects");
    expect(asFragment()).toMatchSnapshot();
  });

  it("Displays a table with a list of projects", async () => {
    const mocks = [
      {
        request: {
          query: LIST_PROJECTS_PAGE_QUERY,
          variables: {
            first: 10,
          },
        },
        result: {
          data: {
            projects: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                endCursor: "xy",
                startCursor: "xy",
              },
              edges: [
                {
                  cursor: "xy",
                  node: {
                    __typename: "Project",
                    id: "1234",
                    name: "test project",
                    description: "none",
                    createdAt: new Date(
                      "2021-02-01T09:00:00-01:00"
                    ).toISOString(),
                    creator: {
                      id: "4567",
                      firstName: "Dummy",
                      lastName: "Testo",
                      profilePictureUrl: null,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ];
    const { findByText, asFragment } = renderWithProviders(
      <ProjectManagementPage />,
      {
        routerProps: { initialEntries: ["/"] },
        graphqlProps: { mocks },
      }
    );

    await findByText("test project");
    expect(asFragment()).toMatchSnapshot();
  });

  it("Creates a project, and refreshes the list with the new project", async () => {
    const mocks = [
      {
        request: {
          query: LIST_PROJECTS_PAGE_QUERY,
          variables: {
            first: 10,
          },
        },
        result: {
          data: {
            projects: null,
          },
        },
      },
      {
        request: {
          query: CREATE_PROJECT_MUTATION,
          variables: {
            name: "test project",
            description: "none",
          },
        },
        result: {
          data: {
            createProject: {
              clientMutationId: "123",
            },
          },
        },
      },
      {
        request: {
          query: LIST_PROJECTS_PAGE_QUERY,
          variables: {
            first: 10,
            last: null,
            before: null,
            after: null,
          },
        },
        result: {
          data: {
            projects: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                endCursor: "xy",
                startCursor: "xy",
              },
              edges: [
                {
                  cursor: "xy",
                  node: {
                    __typename: "Project",
                    id: "1234",
                    name: "test project",
                    description: "none",
                    createdAt: new Date(
                      "2021-02-01T09:00:00-01:00"
                    ).toISOString(),
                    creator: {
                      id: "4567",
                      firstName: "Dummy",
                      lastName: "Testo",
                      profilePictureUrl: null,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ];

    const { findByLabelText, findByText, getByLabelText } = renderWithProviders(
      <ProjectManagementPage />,
      {
        routerProps: { initialEntries: ["/"] },
        graphqlProps: {
          mocks,
        },
      }
    );

    await expect(findByText("test project")).rejects.toThrow();
    const noProjects = await findByText(
      "project-management.list_projects_page.no_projects"
    );

    const addButton = await findByLabelText(
      "project-management.list_projects_page.create_project.btn_add"
    );
    userEvent.click(addButton);

    const saveButton = await findByText("global.controls.btn_save");
    await waitFor(() => expect(saveButton).toBeVisible());

    userEvent.type(
      getByLabelText(
        "project-management.list_projects_page.project_form_dialog.label_name *"
      ),
      "test project"
    );
    userEvent.type(
      getByLabelText(
        "project-management.list_projects_page.project_form_dialog.label_description"
      ),
      "none"
    );

    await waitFor(() => expect(saveButton).not.toBeDisabled());
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).not.toBeInTheDocument());

    await expect(findByText("test project")).resolves.not.toThrow();
    expect(noProjects).not.toBeInTheDocument();
  });
});
