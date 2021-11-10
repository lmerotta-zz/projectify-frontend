import { gql } from "@apollo/client";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { ProjectFragmentFragment } from "generated/graphql";
import { DateTime } from "luxon";
import { Can } from "modules/core";
import { useState } from "react";
import * as Styles from "./Project.styles";

type ProjectProps = {
  project: ProjectFragmentFragment;
};

const Project = ({ project }: ProjectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Styles.MainTableRow>
        <TableCell>
          <IconButton
            aria-label="Toggle project details"
            onClick={() => setOpen(!open)}
            size="small"
          >
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
      </Styles.MainTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box m={3}>
              {project.description && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" data-testid="project-description">
                    {project.description}
                  </Typography>
                </>
              )}

              <Typography variant="h6" component="p" mt={2}>
                Creator
              </Typography>
              <Tooltip
                title={`${project.creator.firstName} ${project.creator.lastName}`}
              >
                <Styles.Avatar
                  data-testid="project-creator"
                  src={project.creator.profilePictureUrl || "undefined"}
                  alt={`${project.creator.firstName} ${project.creator.lastName}`}
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
