import {
  Collapse,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ListProjectsPage = () => {
  const desc = `This is a long description this is a long description this is a
  long description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this This is a long
  description this is a long description this is a long
  description this is a long description this`;
  return (
    <Container component={Paper} sx={{ padding: "20px 0", minHeight: "100%" }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }} component="h1">
        Projects
      </Typography>

      <TableContainer component={Paper} elevation={2}>
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
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell></TableCell>
              <TableCell>Project name</TableCell>
              <TableCell>2021/06/21</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={4}
              >
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <Typography variant="subtitle1">Description</Typography>
                  <Typography variant="body2">{desc}</Typography>
                </Collapse>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell></TableCell>
              <TableCell>Project name</TableCell>
              <TableCell>2021/06/21</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={4}
              >
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <Typography variant="subtitle1">Description</Typography>
                  <Typography variant="body2">{desc}</Typography>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListProjectsPage;
