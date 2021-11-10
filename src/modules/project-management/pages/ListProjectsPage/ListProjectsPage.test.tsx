import { renderWithProviders } from "test-utils";
import ProjectManagementPage from "../ProjectManagementPage/ProjectManagementPage";
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

    await findByText(
      "You have no projects, create one by clicking the button above!"
    );
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
});
