import { nanoid } from "@reduxjs/toolkit";
import { PATHS } from "./paths";
import { AdminDashboard } from "../pages";

export const routes = [
  {
    id: nanoid(),
    path: PATHS.adminDashboard,
    Component: AdminDashboard,
  },
  {
    id: nanoid(),
    path: PATHS.bestPerforming,
    Component: AdminDashboard,
  },
];
