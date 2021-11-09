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
import { useListProjectsQuery } from "generated/graphql";
import { Can, usePagination } from "modules/core";
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
                  {...paginationParams}
                  colSpan={4}
                  count={projectsQuery.data?.projects?.totalCount || 0}
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

      <Can I="create" a="Project">
        <CreateButton color="secondary">
          <Add />
        </CreateButton>
      </Can>
    </Container>
  );
};

export default ListProjectsPage;
