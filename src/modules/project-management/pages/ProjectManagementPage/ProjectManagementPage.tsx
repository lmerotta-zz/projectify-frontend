import { Can } from "modules/core";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const ListProjectsPage = lazy(
  () => import("../ListProjectsPage/ListProjectsPage")
);

const ProjectManagementPage = () => (
  <Routes>
    <Route
      index
      element={
        <Can I="view" a="Project">
          <ListProjectsPage />
        </Can>
      }
    />
  </Routes>
);

export default ProjectManagementPage;
