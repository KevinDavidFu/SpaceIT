import { createBrowserRouter } from "react-router";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { MapScreen } from "./screens/MapScreen";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardScreen,
  },
  {
    path: "/map/:sedeId",
    Component: MapScreen,
  },
  {
    path: "/confirmation",
    Component: ConfirmationScreen,
  },
]);
