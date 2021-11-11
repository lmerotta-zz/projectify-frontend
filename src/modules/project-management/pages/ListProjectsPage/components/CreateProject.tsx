import { Add } from "@mui/icons-material";
import { Fab } from "modules/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectFormDialog from "./ProjectFormDialog/ProjectFormDialog";

const CreateProject = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Fab color="secondary" onClick={() => setOpen(true)} aria-label={t('project-management.list_projects_page.create_project.btn_add')}>
        <Add />
      </Fab>
      <ProjectFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CreateProject;
