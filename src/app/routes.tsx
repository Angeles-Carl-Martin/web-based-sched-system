import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Employees } from "./components/Employees";
import { Departments } from "./components/Departments";
import { Attendance } from "./components/Attendance";
import { Settings } from "./components/Settings";
import { Register } from "./components/Register";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "employees", Component: Employees },
      { path: "departments", Component: Departments },
      { path: "attendance", Component: Attendance },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
