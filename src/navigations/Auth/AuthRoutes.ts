import { Route } from "models";

import { LoginPage } from "features";

export const AuthRoutes: Route[] = [
  {
    exact: true,
    path: "/login",
    Component: LoginPage,
  },
];
