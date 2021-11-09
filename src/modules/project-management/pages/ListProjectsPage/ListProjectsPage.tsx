import { gql } from "@apollo/client";
import { Add } from "@mui/icons-material";
import {
  Container,
  Fab,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ListProjectsQueryVariables,
  useListProjectsQuery,
} from "generated/graphql";
import { ChangeEvent, useCallback, useState } from "react";
import Project from "./components/Project";

const CreateButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer + 2,
  right: theme.spacing(2),
  top: 128,
  transform: "translateY(-50%)",
  [theme.breakpoints.up("sm")]: {
    right: theme.spacing(10),
  },
}));

export const LIST_PROJECTS_PAGE_QUERY = gql`
  ${Project.fragments.project}
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
          id
          ...ProjectFragment
        }
      }
    }
  }
`;

const ListProjectsPage = () => {
  const projectsQuery = useListProjectsQuery({
    variables: { first: 10 },
  });
  const [currentPerPage, setCurrentPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const refetchPagination = useCallback(
    (page: number, perPage: number) => {
      const variables: ListProjectsQueryVariables = {
        first: null,
        last: null,
        before: null,
        after: null,
      };
      if (page === 0) {
        variables.first = perPage;
      } else if (page < currentPage) {
        variables.last = perPage;
        variables.before = projectsQuery.data?.projects?.pageInfo.startCursor;
      } else if (page > currentPage) {
        variables.first = perPage;
        variables.after = projectsQuery.data?.projects?.pageInfo.endCursor;
      }

      projectsQuery.refetch(variables);
    },
    [currentPage, projectsQuery]
  );

  const onPageChange = useCallback(
    (_, page: number) => {
      refetchPagination(page, currentPerPage);
      setCurrentPage(page);
    },
    [currentPerPage, refetchPagination]
  );

  const onPerPageChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const perPage = parseInt(event.target.value, 10) || 10;
      refetchPagination(0, perPage);
      setCurrentPage(0);
      setCurrentPerPage(perPage);
    },
    [refetchPagination]
  );

  if (projectsQuery.loading) {
    return null;
  }

  return (
    <Container
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
        gutterBottom
        component="h1"
      >
        Projects
      </Typography>

      {projectsQuery.data?.projects?.edges?.length! > 0 ? (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ flex: 1, flexGrow: 1 }}
        >
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
                  rowsPerPage={currentPerPage}
                  colSpan={4}
                  count={projectsQuery.data?.projects?.totalCount || 0}
                  page={currentPage}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onPerPageChange}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h5"
          component="p"
          alignSelf="center"
          justifySelf="center"
          sx={{ marginTop: "auto", marginBottom: "auto" }}
        >
          You have no projects, create one by clicking the button above!
        </Typography>
      )}

      <CreateButton color="secondary">
        <Add />
      </CreateButton>
    </Container>
  );
};

export default ListProjectsPage;
