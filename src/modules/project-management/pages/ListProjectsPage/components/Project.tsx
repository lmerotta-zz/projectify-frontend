import { gql } from "@apollo/client";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Can } from "components";
import { ProjectFragmentFragment } from "generated/graphql";
import { DateTime } from "luxon";
import { useState } from "react";

type ProjectProps = {
  project: ProjectFragmentFragment;
};

const Project = ({ project }: ProjectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{project.name}</TableCell>
        <TableCell>
          {DateTime.fromISO(project.createdAt).toLocaleString(
            DateTime.DATE_SHORT
          )}
        </TableCell>
        <TableCell align="right">
          <Can I="view" this={project}>
            <Button>TODO</Button>
          </Can>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              {project.description && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </>
              )}

              <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
                Creator
              </Typography>
              <Tooltip
                title={`${project.creator.firstName} ${project.creator.lastName}`}
              >
                <Avatar
                  src={project.creator.profilePictureUrl || "undefined"}
                  alt={`${project.creator.firstName} ${project.creator.lastName}`}
                  sx={{ display: "inline-flex", marginRight: 2 }}
                />
              </Tooltip>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Project.fragments = {
  project: gql`
    fragment ProjectFragment on Project {
      id
      name
      description
      createdAt
      creator {
        id
        firstName
        lastName
        profilePictureUrl
      }
    }
  `,
};

export default Project;
