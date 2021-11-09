import { Can } from "components";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const ListProjectsPage = lazy(
  () => import("../ListProjectsPage/ListProjectsPage")
);

const ProjectManagementPage = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Can I="view" a="Project">
          <ListProjectsPage />
        </Can>
      }
    />
  </Routes>
);

export default ProjectManagementPage;
