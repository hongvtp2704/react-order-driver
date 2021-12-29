import { Route } from "models";
import {
  HomePage,
  YourOrderPage,
  OrderHistory,
  ProfilePage,
  ChangePasswordPage,
  Analyst,
} from "features";

export const MainRoutes: Route[] = [
  {
    exact: true,
    path: "/profile",
    Component: ProfilePage,
  },
  {
    exact: true,
    path: "/change-password",
    Component: ChangePasswordPage,
  },
  {
    exact: true,
    path: "/your-order",
    Component: YourOrderPage,
  },
  {
    exact: true,
    path: "/analyst",
    Component: Analyst,
  },
  {
    exact: true,
    path: "/order-history",
    Component: OrderHistory,
  },
  {
    exact: true,
    path: "/",
    Component: HomePage,
  },
];
