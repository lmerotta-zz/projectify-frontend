import { Assignment } from "@mui/icons-material";
import { Can, HeaderListItem } from "modules/core";
import { useTranslation } from "react-i18next";

const ProjectSidebarItem = () => {
  const { t } = useTranslation();

  return (
    <Can I="view" a="Project">
      <HeaderListItem
        icon={<Assignment />}
        to="/projects"
        primary={t(
          "project-management.plugins.project_sidebar_item.btn_projects"
        )}
      />
    </Can>
  );
};

export default ProjectSidebarItem;
