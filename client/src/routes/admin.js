import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../views/Admin/Dashboard"));
const ManageAgents = lazy(() => import("../views/Admin/ManageAgents"));
const AssignDepots = lazy(() => import("../views/Admin/ManageAgents/AssignDepots"));

const routes = [
  {
    path: "/", // the url
    component: Dashboard // view rendered
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/manage-agents",
    component: ManageAgents
  },
  {
    path: "/manage-agents/assign-depots", // the url
    component: AssignDepots, // view rendered
  }
];

export default routes;
