import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../views/Agent/Dashboard"));
const ContainersAwaitingConfirmation = lazy(() => import("../views/Agent/Containers/AwaitingConfirmation"));
const ContainersInStock = lazy(() => import("../views/Agent/Containers/InStock"));
const ContainersBookingList = lazy(() => import("../views/Agent/Containers/BookingList"));
const ContainersSelection = lazy(() => import("../views/Agent/Containers/Selection"));

const routes = [
  {
    path: "/", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/containers/awaiting-confirmation", // the url
    component: ContainersAwaitingConfirmation, // view rendered
  },
  {
    path: "/containers/in-stock", // the url
    component: ContainersInStock, // view rendered
  },
  {
    path: "/bookings", // the url
    component: ContainersBookingList, // view rendered
  },
  {
    path: "/containers/selection", // the url
    component: ContainersSelection, // view rendered
  }
];

export default routes;
