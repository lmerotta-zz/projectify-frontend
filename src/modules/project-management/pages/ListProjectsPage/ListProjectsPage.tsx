import { gql } from "@apollo/client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useListProjectsQuery } from "generated/graphql";
import { Can, usePagination } from "modules/core";
import { useTranslation } from "react-i18next";
import CreateProject from "./components/CreateProject";
import Project from "./components/Project/Project";
import * as Styles from "./ListProjectsPage.styles";
export const LIST_PROJECTS_PAGE_QUERY = gql`
  query ListProjects($first: Int, $last: Int, $before: String, $after: String) {
    projects(first: $first, last: $last, before: $before, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          ...ProjectFragment
        }
      }
    }
  }
  ${Project.fragments.project}
`;

const ListProjectsPage = () => {
  const { refetch, ...projectsQuery } = useListProjectsQuery({
    variables: { first: 10 },
  });

  const { t } = useTranslation();

  const { PaginationProvider, resetPagination: _, ...paginationParams } = usePagination(
    refetch,
    projectsQuery.data?.projects?.pageInfo?.startCursor,
    projectsQuery.data?.projects?.pageInfo?.endCursor
  );

  if (projectsQuery.loading) {
    return null;
  }

  return (
    <PaginationProvider>
      <Styles.Container>
        <Typography variant="h4" fontWeight={700} gutterBottom component="h1">
          {t("project-management.list_projects_page.title")}
        </Typography>

        {projectsQuery.data?.projects?.edges?.length! > 0 ? (
          <Styles.TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    {t(
                      "project-management.list_projects_page.projects_table.cell_name"
                    )}
                  </TableCell>
                  <TableCell>
                    {t(
                      "project-management.list_projects_page.projects_table.cell_created_at"
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectsQuery.data!.projects!.edges!.map((p) => (
                  <Project project={p!.node!} key={p!.cursor} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    {...paginationParams}
                    colSpan={4}
                    count={projectsQuery.data?.projects?.totalCount!}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Styles.TableContainer>
        ) : (
          <Typography
            variant="h5"
            component="p"
            alignSelf="center"
            justifySelf="center"
            marginTop="auto"
            marginBottom="auto"
          >
            {t("project-management.list_projects_page.no_projects")}
          </Typography>
        )}

        <Can I="create" a="Project">
          <CreateProject />
        </Can>
      </Styles.Container>
    </PaginationProvider>
  );
};

export default ListProjectsPage;
