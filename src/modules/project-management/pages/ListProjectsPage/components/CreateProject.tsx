import { Add } from "@mui/icons-material";
import { Fab } from "modules/core";
import { useState } from "react";
import ProjectFormDialog from "./ProjectFormDialog/ProjectFormDialog";

const CreateProject = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab color="secondary" onClick={() => setOpen(true)}>
        <Add />
      </Fab>
      <ProjectFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CreateProject;
