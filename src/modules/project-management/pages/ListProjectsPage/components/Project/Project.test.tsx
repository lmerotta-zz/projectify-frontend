import { Table, TableBody } from "@mui/material";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectFragmentFragment } from "generated/graphql";
import { renderWithProviders } from "test-utils";
import Project from "./Project";

describe("Project component unit tests", () => {
  const project: ProjectFragmentFragment = {
    __typename: "Project",
    id: "1234",
    description: null,
    name: "project name",
    createdAt: new Date("2021-02-01T09:00:00-01:00").toISOString(),
    creator: {
      __typename: "User",
      id: "4444",
      firstName: "name",
      lastName: "lastname",
      profilePictureUrl: "profilepic",
    },
  };

  it("Shows/Hides the details when clicking on the collapse button", async () => {
    const { findByTestId, getByLabelText } = renderWithProviders(
      <Table>
        <TableBody>
          <Project project={project} />
        </TableBody>
      </Table>
    );

    const toggleButton = getByLabelText("Toggle project details");

    userEvent.click(toggleButton);

    const creator = await findByTestId("project-creator");

    expect(creator).toBeVisible();

    userEvent.click(toggleButton);

    await waitFor(() => expect(creator).not.toBeVisible());
  });
});
