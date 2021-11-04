import { lazy } from "react";
import { Route, Routes } from "react-router";

const ListProjectsPage = lazy(
  () => import("../ListProjectsPage/ListProjectsPage")
);

const ProjectManagementPage = () => (
  <Routes>
    <Route path="/" element={<ListProjectsPage />} />
  </Routes>
);

export default ProjectManagementPage;
