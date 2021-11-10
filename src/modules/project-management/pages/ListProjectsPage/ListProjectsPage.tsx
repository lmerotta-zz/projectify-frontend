import { gql } from "@apollo/client";
import { Add } from "@mui/icons-material";
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
import { Can, Fab, usePagination } from "modules/core";
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

  const paginationParams = usePagination(
    refetch,
    projectsQuery.data?.projects?.pageInfo?.startCursor,
    projectsQuery.data?.projects?.pageInfo?.endCursor
  );

  if (projectsQuery.loading) {
    return null;
  }

  return (
    <Styles.Container>
      <Typography variant="h4" fontWeight={700} gutterBottom component="h1">
        Projects
      </Typography>

      {projectsQuery.data?.projects?.edges?.length! > 0 ? (
        <Styles.TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created at</TableCell>
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
          You have no projects, create one by clicking the button above!
        </Typography>
      )}

      <Can I="create" a="Project">
        <Fab color="secondary">
          <Add />
        </Fab>
      </Can>
    </Styles.Container>
  );
};

export default ListProjectsPage;
